import Icon from '../Icon/Icon';
import './IconSwapLarge.css';

/**
 * IconSwapLarge — Figma "아이콘변경2" (node 879:6259)
 * 40px 둥근 틀 안에 큰 아이콘. 기본은 아이콘-9(check)
 *
 * @param {string} name   Icon의 name (Icon.jsx 목록 참고)
 * @param {string} label  아이콘이 뜻을 전달할 때만 넣는 설명
 */
export default function IconSwapLarge({ name = 'check', label, className = '' }) {
  return (
    <span className={['icon-swap-large', className].filter(Boolean).join(' ')}>
      <Icon name={name} label={label} className="icon-swap-large__icon" />
    </span>
  );
}
