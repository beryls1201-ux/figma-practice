import Icon from '../Icon/Icon';
import './IconSwap.css';

/**
 * IconSwap — Figma "아이콘변경" (node 879:6258)
 * 틀 가운데에 아이콘을 넣어 바꿔 쓰는 컴포넌트. 기본은 아이콘-1(arrow-down)
 *
 * @param {string} name   Icon의 name (Icon.jsx 목록 참고)
 * @param {16|20} size    틀 크기. 16(기본) / 20(체크박스 안에서 사용)
 * @param {string} label  아이콘이 뜻을 전달할 때만 넣는 설명
 */
export default function IconSwap({
  name = 'arrow-down',
  size = 16,
  label,
  className = '',
}) {
  const classNames = [
    'icon-swap',
    size === 20 && 'icon-swap--20',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      <Icon name={name} label={label} />
    </span>
  );
}
