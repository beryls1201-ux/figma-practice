import ImageFrame from '../ImageFrame/ImageFrame';
import './MainBanner.css';

/**
 * MainBanner — Figma "메인-배너" (node 879:5550)
 *   Property 1=모바일   → 767px 이하 (제목 Title/Card 18px, 설명 Body/Medium 17px)
 *   Property 1=데스크탑 → 768px 이상 (제목 Display 34px, 설명 Body/Large 19px)
 *
 * @param {string} imageSrc  배너 이미지
 * @param {string} imageAlt  이미지 대체 텍스트
 * @param {string} title     제목 (예: "Green Green Museum : Sensory Notes")
 * @param {string[]} info    설명 줄 목록 (예: ["Date: 2026.08.11 - 2026.12.04", "Suwon Manseok Gallery"])
 * @param {string} titleTag  제목 태그 (기본 'h2')
 */
export default function MainBanner({
  imageSrc,
  imageAlt = '',
  title,
  info = [],
  titleTag: TitleTag = 'h2',
  className = '',
}) {
  return (
    <section className={['main-banner', className].filter(Boolean).join(' ')}>
      <ImageFrame src={imageSrc} alt={imageAlt} className="main-banner__image" />
      <div className="main-banner__text">
        <TitleTag className="main-banner__title">{title}</TitleTag>
        {info.length > 0 && (
          <ul className="main-banner__info">
            {info.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
