import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainBanner from '../MainBanner/MainBanner';
import './MainBannerSlider.css';

/**
 * MainBannerSlider — 메인 배너 자동 슬라이드 (실제 사이트 suma.suwon.go.kr 메인과 같은 동작)
 *   - 4초마다 다음 배너로 겹쳐지며(페이드) 바뀜, 마지막 다음은 처음으로
 *   - 이미지 아래쪽 가운데에 사각형 인디케이터 (누르면 해당 배너로 이동)
 *
 * 원본에 없던 개선점 (접근성, PRD 5.4)
 *   - 마우스를 올리거나 키보드 포커스가 들어오면 잠시 멈춤
 *   - "움직임 줄이기" 설정 사용자는 처음부터 멈춘 상태
 *   - 인디케이터·버튼 터치 영역 44px, 화면낭독기용 이름
 *   - 모바일에서 손가락으로 옆으로 밀어 넘기기
 *
 * @param {{id, imageSrc, imageAlt, title, info}[]} slides  배너 목록 (src/data/banners.js 형식)
 * @param {string} label       배너 묶음 이름 (화면낭독기용, 예: "주요 전시 배너")
 * @param {function} goToLabel 인디케이터 이름 만들기 (n → "배너 n번째 보기")
 */
const INTERVAL = 4000; // 실제 사이트와 같은 4초
const SWIPE_DISTANCE = 50; // 이만큼(px) 이상 밀어야 넘어감

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function MainBannerSlider({
  slides = [],
  label,
  goToLabel = (n) => `Go to banner ${n}`,
  className = '',
}) {
  const [index, setIndex] = useState(0);
  const [playing] = useState(() => !prefersReducedMotion());
  const [hold, setHold] = useState(false); // 마우스·포커스가 안에 있는 동안 잠시 멈춤
  const [controlsTop, setControlsTop] = useState(null);
  const rootRef = useRef(null);
  const touchStartX = useRef(null);
  const count = slides.length;
  const autoPlaying = playing && !hold && count > 1;

  const goTo = (next) => setIndex((next + count) % count);

  // 자동 넘김: 배너가 바뀔 때마다 4초 타이머를 새로 시작
  useEffect(() => {
    if (!autoPlaying) return undefined;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % count), INTERVAL);
    return () => clearTimeout(timer);
  }, [autoPlaying, index, count]);

  // 인디케이터를 이미지 아래쪽에 맞추기: 이미지 아래 끝 위치를 재고, 화면 크기가 바뀌면 다시 잼
  useLayoutEffect(() => {
    const root = rootRef.current;
    const image = root?.querySelector('.main-banner__image');
    if (!image) return undefined;
    const update = () => setControlsTop(image.offsetTop + image.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const handleBlur = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget)) setHold(false);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < SWIPE_DISTANCE) return;
    goTo(distance < 0 ? index + 1 : index - 1);
  };

  return (
    <section
      ref={rootRef}
      className={['main-banner-slider', className].filter(Boolean).join(' ')}
      aria-label={label}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={handleBlur}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      {/* 배너: 같은 자리에 겹쳐 두고 현재 배너만 보임. 멈춘 동안에는 바뀐 배너를 화면낭독기가 읽어 줌 */}
      <div className="main-banner-slider__slides" aria-live={autoPlaying ? 'off' : 'polite'}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={['main-banner-slider__slide', i === index && 'main-banner-slider__slide--active']
              .filter(Boolean)
              .join(' ')}
            inert={i !== index}
          >
            <MainBanner
              className={`main-banner--${slide.id}`}
              imageSrc={slide.imageSrc}
              imageSrcDesktop={slide.imageSrcDesktop}
              imageAlt={slide.imageAlt}
              title={slide.title}
              info={slide.info}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div
          className="main-banner-slider__controls"
          style={controlsTop === null ? undefined : { top: `${controlsTop}px` }}
        >
          {/* 사각형 인디케이터 */}
          <ul className="main-banner-slider__pager">
            {slides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  className={['main-banner-slider__dot', i === index && 'main-banner-slider__dot--active']
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={goToLabel(i + 1)}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
