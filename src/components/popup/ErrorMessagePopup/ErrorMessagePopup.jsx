import { useId } from 'react';
import PopupSymbol from '../PopupSymbol/PopupSymbol';
import ButtonSmall from '../../button/ButtonSmall/ButtonSmall';
import './ErrorMessagePopup.css';

/**
 * ErrorMessagePopup — Figma "에러메시지 팝업창" (node 879:5308)
 *   Property 1=데스크탑 → 768px 이상 (너비 600px, 안내 문구 가운데 정렬)
 *   Property 1=모바일   → 767px 이하 (너비 340px, 안내 문구 왼쪽 정렬)
 *   Property 2 (오류 종류)는 글자만 다르므로 errors로 받음
 * 화면에 띄울 때는 <Modal role="alertdialog">로 감싸서 사용
 *
 * Figma 오류 문구 예시 (Property 2)
 *   방문일자   : 'Visit Date & Time:'  / 'Please select a visit date & time.'
 *   단체명     : 'Organization Name:'  / 'Please enter your organization or university name.'
 *   방문인원   : 'Visitor Count:'      / 'Group tours are limited to 30 visitors.'
 *   이메일주소 : 'Contact Person:'     / 'Please enter a valid email address.'
 *   도슨트     : 'Docent Request:'     / 'Please choose whether you need an English docent.'
 *
 * @param {string} titleId  제목 id (Modal의 labelledBy와 같은 값). 없으면 자동 생성
 * @param {string} title    제목 (기본 "Please check your reservation")
 * @param {string} message  안내 문구
 * @param {{field: string, message: string}[]} errors  오류 목록 (여러 개 가능)
 * @param {string} buttonLabel  버튼 글자 (기본 "OK, Take me to the First Error")
 * @param {function} onConfirm  버튼 클릭 (첫 번째 오류 입력창으로 이동하는 동작을 연결)
 */
export default function ErrorMessagePopup({
  titleId,
  title = 'Please check your reservation',
  message = "We couldn't submit your request. Please correct the following.",
  errors = [],
  buttonLabel = 'OK, Take me to the First Error',
  onConfirm,
  className = '',
}) {
  const autoId = useId();
  const headingId = titleId ?? autoId;

  return (
    <div className={['error-message-popup', className].filter(Boolean).join(' ')}>
      <div className="error-message-popup__body">
        {/* 기호+메인메시지 */}
        <div className="error-message-popup__head">
          <PopupSymbol type="error" />
          <h2 id={headingId} className="error-message-popup__title">
            {title}
          </h2>
        </div>

        {message && <p className="error-message-popup__message">{message}</p>}

        {errors.length > 0 && (
          <ul className="error-message-popup__errors">
            {errors.map((error) => (
              <li key={error.field} className="error-message-popup__error">
                <span className="error-message-popup__field">{error.field}</span>
                <span className="error-message-popup__error-text">{error.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="error-message-popup__actions">
        <ButtonSmall variant="filled" block onClick={onConfirm}>
          {buttonLabel}
        </ButtonSmall>
      </div>
    </div>
  );
}
