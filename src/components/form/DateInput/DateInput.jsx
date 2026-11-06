import Icon from '../../icon/Icon/Icon';
import './DateInput.css';

/**
 * DateInput — Figma "정보입력창" 날짜 칸 (입력메뉴1: 안내 문구 + 달력 아이콘-4)
 * 누르면 날짜·시간 선택 팝업을 여는 버튼 (팝업은 밖에서 <Modal> + <DateTimePickerPopup>로 연결)
 *
 * @param {string} id           FormField의 htmlFor와 연결할 id
 * @param {string} value        선택한 날짜·시간 표시 글자 (없으면 placeholder)
 * @param {string} placeholder  안내 문구 (기본 "Select Date & Time")
 * @param {function} onClick    눌렀을 때 (팝업 열기)
 */
export default function DateInput({
  id,
  value,
  placeholder = 'Select Date & Time',
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      id={id}
      type="button"
      className={['date-input', value && 'date-input--filled', className].filter(Boolean).join(' ')}
      aria-haspopup="dialog"
      onClick={onClick}
      {...rest}
    >
      <span className="date-input__text">{value || placeholder}</span>
      <Icon name="calendar" />
    </button>
  );
}
