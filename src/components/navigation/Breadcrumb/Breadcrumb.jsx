import IconSwap from '../../icon/IconSwap/IconSwap';
import './Breadcrumb.css';

/**
 * Breadcrumb — Figma "선택메뉴 현재위치" (node 879:6361)
 * 현재 위치 표시 (Caption/Regular 15px)
 *   Property 1=모바일1·2   → 767px 이하 (좌우 16px)
 *   Property 1=데스크탑1·2 → 768px 이상 (좌우 30px, 위아래 15px, 아래 테두리)
 *   ("1", "2"는 글자만 다른 예시라 하나의 컴포넌트로 처리)
 *
 * @param {{label: string, href?: string}[]} items
 *   예: [{ label: 'Home', href: '/' }, { label: 'Education', href: '/education' },
 *        { label: 'Programs & Workshops' }]
 *   마지막 항목은 현재 페이지로 표시 (링크 아님)
 * @param {string} label  화면낭독기용 영역 이름 (국문 화면에서는 "현재 위치")
 */
export default function Breadcrumb({ items = [], label = 'Breadcrumb', className = '' }) {
  return (
    <nav className={['breadcrumb', className].filter(Boolean).join(' ')} aria-label={label}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="breadcrumb__item">
              {isLast ? (
                <span className="breadcrumb__text" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="breadcrumb__text breadcrumb__link">
                  {item.label}
                </a>
              )}
              {!isLast && <IconSwap name="chevron-right" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
