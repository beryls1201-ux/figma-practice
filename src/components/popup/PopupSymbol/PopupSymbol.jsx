import IconSwapLarge from '../../icon/IconSwapLarge/IconSwapLarge';
import './PopupSymbol.css';

/**
 * PopupSymbol — Figma "팝업창강조기호"
 * 팝업 맨 위의 40px 동그라미 기호 (안에 아이콘변경2)
 *   type="success" : 진한 초록 + 흰 ✔ (예약 성공 메시지 팝업창)
 *   type="error"   : 빨강 + 흰 ! (에러메시지 팝업창)
 * 꾸밈용이라 화면낭독기는 읽지 않음 (제목이 뜻을 전달)
 *
 * @param {'success'|'error'} type  기호 종류
 */
const ICONS = {
  success: 'check',
  error: 'exclamation',
};

export default function PopupSymbol({ type = 'success', className = '' }) {
  return (
    <span
      className={['popup-symbol', `popup-symbol--${type}`, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <IconSwapLarge name={ICONS[type]} />
    </span>
  );
}
