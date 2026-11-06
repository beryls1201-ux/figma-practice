import ImageFrame from '../ImageFrame/ImageFrame';
import ExhibitionType from '../ExhibitionType/ExhibitionType';
import Button from '../../button/Button/Button';
import './InfoCard.css';

/**
 * InfoCard — Figma "정보카드" (node 879:5566, 안쪽 "교육 & 전시정보")
 * 이미지 + 대상 태그 + 제목(최대 2줄) + 설명 + Apply 버튼
 *   Property 1=모바일   → 767px 이하
 *   Property 1=데스크탑 → 768px 이상
 *
 * @param {string} imageSrc   카드 이미지
 * @param {string} imageAlt   이미지 대체 텍스트
 * @param {'Child'|'Adult'|'Family'} type  대상 태그. 없으면 태그 숨김
 * @param {string} typeLabel  태그 글자 (국문 화면에서 바꿀 때. 예: "어린이")
 * @param {string} title     제목 (2줄이 넘으면 …으로 줄임)
 * @param {string[]} info     설명 줄 목록 (예: ["Date: 2026.11.03 - 2026.11.27", "Suwon Manseok Gallery"])
 * @param {function} onApply  Apply 버튼을 눌렀을 때 실행할 함수
 * @param {string} applyLabel 버튼 글자 (기본 "Apply", 국문 화면에서 바꿀 때. 예: "Guide")
 * @param {'filled'|'outlined'} buttonVariant  버튼 모양
 *   filled(기본) : 검은 배경 (Figma 버튼 "활성화", Apply)
 *   outlined     : 테두리 + 회색 글자 (Figma 버튼 "비활성화", Guide)
 * @param {string} titleTag   제목 태그 (기본 'h3')
 */
export default function InfoCard({
  imageSrc,
  imageAlt = '',
  type,
  typeLabel,
  title,
  info = [],
  onApply,
  applyLabel = 'Apply',
  buttonVariant = 'filled',
  titleTag: TitleTag = 'h3',
  className = '',
}) {
  return (
    <article className={['info-card', className].filter(Boolean).join(' ')}>
      <div className="info-card__inner">
        <ImageFrame src={imageSrc} alt={imageAlt} />

        {/* 전시정보-타입 및 버튼 추가 */}
        <div className="info-card__body">
          {type && <ExhibitionType type={type}>{typeLabel}</ExhibitionType>}

          {/* 전시정보 */}
          <div className="info-card__text">
            <TitleTag className="info-card__title" title={title}>
              {title}
            </TitleTag>
            {info.length > 0 && (
              <ul className="info-card__info">
                {info.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Figma 버튼 "활성화"(filled)·"비활성화"(outlined) 모양.
              켜고 끄는 버튼이 아니므로 aria-pressed는 제거 */}
          <Button
            size="large"
            selected={buttonVariant === 'filled'}
            aria-pressed={undefined}
            className="info-card__button"
            onClick={onApply}
          >
            {applyLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
