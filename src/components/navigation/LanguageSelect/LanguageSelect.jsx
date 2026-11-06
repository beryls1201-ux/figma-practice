import { useEffect, useId, useRef, useState } from 'react';
import IconSwap from '../../icon/IconSwap/IconSwap';
import './LanguageSelect.css';

/**
 * LanguageSelect — Figma "언어선택" (node 302:16552) + "언어선택박스" 4종
 *   닫힘: 현재 언어 + ▼ (76 × 34)
 *   열림: 아래에 EN / KO 목록 (Figma "기본")
 *   마우스 올림·키보드 포커스한 줄: 파란 배경 (Figma "영어선택"·"국어선택")
 * 언어를 고르거나, 바깥을 클릭하거나, Esc를 누르면 닫힘 (CLAUDE.md 3.4, PRD FR-08)
 *
 * @param {'en'|'ko'} value    현재 언어
 * @param {function} onChange  언어를 고르면 ('en' | 'ko')를 받음 (실제 주소 이동은 URL 구조 확정 후)
 * @param {{value, label, name}[]} options  언어 목록
 *   value: 'en' | 'ko', label: 상자·목록에 보이는 글자, name: 화면낭독기용 이름
 *   글자는 현재 화면 언어로 넘겨 주세요 (예: 한국어 화면 → label "영어"/"국어", name "영어"/"한국어")
 * @param {string} label       화면낭독기용 이름 (기본 "Language", 국문 "언어 선택")
 */
const DEFAULT_OPTIONS = [
  { value: 'en', label: 'EN', name: 'English' },
  { value: 'ko', label: 'KO', name: '한국어' },
];

export default function LanguageSelect({
  value = 'en',
  onChange,
  options = DEFAULT_OPTIONS,
  label = 'Language',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const listId = useId();
  const current = options.find((option) => option.value === value) ?? options[0];

  // 열려 있을 때만: 바깥 클릭·Esc로 닫기
  useEffect(() => {
    if (!open) return undefined;

    const handlePointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const choose = (nextValue) => {
    setOpen(false);
    toggleRef.current?.focus();
    if (nextValue !== value) onChange?.(nextValue);
  };

  return (
    <div
      ref={rootRef}
      className={['language-select', open && 'language-select--open', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="language-select__box">
        {/* 영어상자(현재 언어) */}
        <button
          ref={toggleRef}
          type="button"
          className="language-select__toggle"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`${label}: ${current.name}`}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{current.label}</span>
          <IconSwap name="arrow-down" />
        </button>

        {/* 선택상자 */}
        <ul id={listId} className="language-select__list" hidden={!open}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className="language-select__option"
                aria-current={option.value === value ? 'true' : undefined}
                aria-label={option.name}
                onClick={() => choose(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
