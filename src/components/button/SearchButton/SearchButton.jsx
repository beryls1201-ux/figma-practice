import './SearchButton.css';

/**
 * SearchButton — Figma "검색상자" (데크스탑-메인 헤더 node 231:1192)
 * 76 × 34 테두리 상자 + "Search" (Menu/PC/Bold 16px SemiBold)
 * TODO: 검색 화면·동작이 정해지지 않아 onClick만 알려 줌
 *
 * @param {function} onClick  눌렀을 때
 * @param {React.ReactNode} children  글자 (기본 "Search", 국문 "검색")
 */
export default function SearchButton({ onClick, children = 'Search', className = '', ...rest }) {
  return (
    <button
      type="button"
      className={['search-button', className].filter(Boolean).join(' ')}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
