import { useId } from 'react';
import PopupSymbol from '../PopupSymbol/PopupSymbol';
import ButtonSmall from '../../button/ButtonSmall/ButtonSmall';
import './BookingSuccessPopup.css';

/**
 * BookingSuccessPopup — Figma "예약 성공 메시지 팝업창" (node 879:5264)
 *   Property 1=데스크탑(가로형) → 768px 이상 (너비 550px)
 *   Property 1=모바일(세로형)   → 767px 이하 (너비 328px, 안내 문구 Body/Large)
 * 화면에 띄울 때는 <Modal>로 감싸서 사용
 *
 * @param {string} titleId    제목 id (Modal의 labelledBy와 같은 값). 없으면 자동 생성
 * @param {string} title      제목 (기본 "Booking Confirmed")
 * @param {string} message    안내 문구 (예: "A confirmation email has been sent to name@example.com.")
 * @param {{label: string, value: string}[]} details  예약 정보 줄 (예약확인)
 *   예: [{ label: 'When', value: 'Sat, Oct 24, 2:00 PM' },
 *        { label: 'Group Size', value: '25 visitors' },
 *        { label: 'Reservation No.', value: 'A-0000' }]
 * @param {string} notice     아래 안내 (예: "Please arrive 15 minutes before your scheduled time.")
 * @param {string} primaryLabel    검은 버튼 글자 (기본 "Go to Main Page")
 * @param {function} onPrimary     검은 버튼 클릭
 * @param {string} secondaryLabel  테두리 버튼 글자 (기본 "View Reservation Details")
 * @param {function} onSecondary   테두리 버튼 클릭
 */
export default function BookingSuccessPopup({
  titleId,
  title = 'Booking Confirmed',
  message,
  details = [],
  notice,
  primaryLabel = 'Go to Main Page',
  onPrimary,
  secondaryLabel = 'View Reservation Details',
  onSecondary,
  className = '',
}) {
  const autoId = useId();
  const headingId = titleId ?? autoId;

  return (
    <div className={['booking-success-popup', className].filter(Boolean).join(' ')}>
      <div className="booking-success-popup__body">
        {/* 기호+메인메시지 */}
        <div className="booking-success-popup__head">
          <PopupSymbol type="success" />
          <h2 id={headingId} className="booking-success-popup__title">
            {title}
          </h2>
        </div>

        {message && <p className="booking-success-popup__message">{message}</p>}

        {/* 예약확인 */}
        {details.length > 0 && (
          <dl className="booking-success-popup__details">
            {details.map((item) => (
              <div key={item.label} className="booking-success-popup__row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {notice && <p className="booking-success-popup__notice">{notice}</p>}
      </div>

      <div className="booking-success-popup__actions">
        <ButtonSmall variant="filled" block onClick={onPrimary}>
          {primaryLabel}
        </ButtonSmall>
        <ButtonSmall variant="outlined" block onClick={onSecondary}>
          {secondaryLabel}
        </ButtonSmall>
      </div>
    </div>
  );
}
