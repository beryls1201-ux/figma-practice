import './FormField.css';

/**
 * FormField — Figma "입력메뉴" (입력제목 + 정보입력창)
 *   입력제목: 필수 표시(⁕, 빨강) + 항목 이름 (Label 17px Bold)
 *   정보입력창: 입력칸을 넣는 자리 (여러 개면 12px 간격)
 *
 * @param {string} label     항목 이름 (예: "Organization Name")
 * @param {boolean} required 필수 항목 표시
 * @param {string} htmlFor   입력칸 하나일 때 그 입력칸의 id (이름을 누르면 입력칸으로 이동)
 * @param {boolean} group    입력칸이 여러 개이거나 선택지 묶음일 때 true (fieldset + legend로 묶음)
 * @param {string} requiredText  화면낭독기용 필수 문구 (기본 "required", 국문 "필수")
 * @param {React.ReactNode} children  입력칸
 */
export default function FormField({
  label,
  required = false,
  htmlFor,
  group = false,
  requiredText = 'required',
  children,
  className = '',
}) {
  const classNames = ['form-field', className].filter(Boolean).join(' ');

  const title = (
    <>
      {required && (
        <span className="form-field__required" aria-hidden="true">
          ⁕
        </span>
      )}
      <span>{label}</span>
      {required && <span className="sr-only"> ({requiredText})</span>}
    </>
  );

  if (group) {
    return (
      <fieldset className={classNames}>
        <legend className="form-field__title">{title}</legend>
        <div className="form-field__body">{children}</div>
      </fieldset>
    );
  }

  return (
    <div className={classNames}>
      <label htmlFor={htmlFor} className="form-field__title">
        {title}
      </label>
      <div className="form-field__body">{children}</div>
    </div>
  );
}
