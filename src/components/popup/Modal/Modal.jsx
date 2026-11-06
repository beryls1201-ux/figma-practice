import { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Modal — 팝업을 화면 위에 띄우는 틀 (Figma에는 없음, CLAUDE.md 3.4 규칙)
 * 브라우저 기본 <dialog>를 사용
 *   - Esc 키로 닫힘
 *   - 바깥(어두운 배경) 클릭으로 닫힘
 *   - 열려 있는 동안 뒤 화면은 누를 수 없고, Tab 포커스는 팝업 안에서만 이동
 *   - 닫히면 팝업을 열었던 버튼으로 포커스가 돌아감
 *
 * @param {boolean} open        열림 여부
 * @param {function} onClose    닫아야 할 때 실행 (Esc·바깥 클릭)
 * @param {string} labelledBy   팝업 제목 요소의 id (화면낭독기가 팝업 이름으로 읽음)
 * @param {'dialog'|'alertdialog'} role  오류 알림이면 'alertdialog'
 * @param {React.ReactNode} children  팝업 내용 (예: <BookingSuccessPopup />)
 */
export default function Modal({
  open = false,
  onClose,
  labelledBy,
  role = 'dialog',
  children,
  className = '',
}) {
  const dialogRef = useRef(null);

  // open 값에 따라 열고 닫기
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Esc 키: 브라우저가 바로 닫지 않게 막고 onClose로 알림
  const handleCancel = (event) => {
    event.preventDefault();
    onClose?.();
  };

  // 바깥(배경) 클릭: dialog 자기 자신을 누른 경우만 닫기
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className={['modal', className].filter(Boolean).join(' ')}
      role={role === 'alertdialog' ? 'alertdialog' : undefined}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      {open && children}
    </dialog>
  );
}
