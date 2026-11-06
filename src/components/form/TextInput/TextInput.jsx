import './TextInput.css';

/**
 * TextInput — Figma "정보입력창" 안의 입력칸 (Figma 레이어 이름 "Button - Small")
 * 둥근 테두리 입력칸, 안내 문구(placeholder)는 Body/Small 15px
 * <input>의 속성(id, type, value, onChange, placeholder, required 등)을 그대로 받음
 */
export default function TextInput({ className = '', type = 'text', ...rest }) {
  return <input type={type} className={['text-input', className].filter(Boolean).join(' ')} {...rest} />;
}
