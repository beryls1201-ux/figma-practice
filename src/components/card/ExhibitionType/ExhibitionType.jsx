import './ExhibitionType.css';

/**
 * ExhibitionType — Figma "전시타입" (node 879:6295)
 * 프로그램 대상을 보여 주는 태그
 *   Property 1=Child  → 초록 계열, 글자 "Child"
 *   Property 1=Adult  → 파랑 계열, 글자 "Adults"
 *   Property 1=Family → 초록 계열, 글자 "Family", 최소 너비 64px
 *
 * @param {'Child'|'Adult'|'Family'} type  태그 종류
 * @param {React.ReactNode} children  글자 (국문 화면 등에서 바꿀 때). 없으면 Figma 글자 사용
 */
const LABELS = {
  Child: 'Child',
  Adult: 'Adults',
  Family: 'Family',
};

export default function ExhibitionType({ type = 'Child', children, className = '' }) {
  const classNames = [
    'exhibition-type',
    `exhibition-type--${type.toLowerCase()}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children ?? LABELS[type]}</span>;
}
