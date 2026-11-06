import arrowDown from '../../../assets/icons/arrow-down.svg';
import menu from '../../../assets/icons/menu.svg';
import close from '../../../assets/icons/close.svg';
import calendar from '../../../assets/icons/calendar.svg';
import chevronRight from '../../../assets/icons/chevron-right.svg';
import keyboard from '../../../assets/icons/keyboard.svg';
import edit from '../../../assets/icons/edit.svg';
import arrowDropDown from '../../../assets/icons/arrow-drop-down.svg';
import keyboardArrowLeft from '../../../assets/icons/keyboard-arrow-left.svg';
import keyboardArrowRight from '../../../assets/icons/keyboard-arrow-right.svg';
import colon from '../../../assets/icons/colon.svg';
import './Icon.css';

/**
 * Icon — Figma "아이콘-1 ~ 아이콘-12" (섹션 "아이콘", node 879:6260) + 팝업에서 쓰는 아이콘
 *
 * 색: SVG에서는 모양만 가져오고, 색은 글자색(currentColor)으로 칠합니다.
 *     부모나 className에서 color를 토큰으로 지정하면 아이콘 색이 바뀝니다.
 *
 * name 목록 (Figma 이름 → name, 크기)
 *   아이콘-1  → arrow-down     16px
 *   아이콘-2  → menu           16px
 *   아이콘-3  → close          16px
 *   아이콘-4  → calendar       16px
 *   아이콘-5  → play           16px (Figma에서 아이콘-1을 회전한 것)
 *   아이콘-6  → chevron-right  16px
 *   아이콘-7  → radio-checked  20px
 *   아이콘-8  → radio          20px
 *   아이콘-9  → check          24px (글자 ✔, 초록)
 *   아이콘-10 → exclamation    24px (글자 !, 팝업창강조기호에서 사용)
 *   아이콘-11 → keyboard       24px
 *   아이콘-12 → edit           24px
 *   arrow_drop_down      → arrow-drop-down       24px
 *   keyboard_arrow_left  → keyboard-arrow-left   24px
 *   keyboard_arrow_right → keyboard-arrow-right  24px
 *   Vector (시간 입력 사이 ":") → colon      8 × 27px
 *
 * @param {string} name   위 목록의 이름
 * @param {string} label  아이콘이 뜻을 전달할 때만 넣는 설명. 없으면 화면낭독기가 읽지 않음
 */
const IMAGES = {
  'arrow-down': arrowDown,
  menu,
  close,
  calendar,
  play: arrowDown,
  'chevron-right': chevronRight,
  keyboard,
  edit,
  'arrow-drop-down': arrowDropDown,
  'keyboard-arrow-left': keyboardArrowLeft,
  'keyboard-arrow-right': keyboardArrowRight,
  colon,
};

// 글자로 그리는 아이콘
const GLYPHS = {
  check: '✔',
  exclamation: '!',
};

export default function Icon({ name, label, className = '' }) {
  const classNames = ['icon', `icon--${name}`, className]
    .filter(Boolean)
    .join(' ');
  const a11y = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true };

  // 아이콘-7, 아이콘-8: 라디오 모양
  // SVG 원으로 그림: 원 20px 안의 점 15px(여백 2.5px)을 Figma처럼 정 가운데에 그리기 위해
  // (CSS 테두리·배경은 반 픽셀을 한쪽으로 몰아 그려 100% 화면에서 점이 0.5px 쏠려 보였음)
  if (name === 'radio' || name === 'radio-checked') {
    return (
      <span className={classNames} {...a11y}>
        <svg className="icon__radio" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
          {/* 기호: 테두리 0.5px (선 가운데가 반지름 9.75px → 바깥 지름 20px) */}
          <circle className="icon__radio-ring" cx="10" cy="10" r="9.75" />
          {name === 'radio-checked' && <circle className="icon__radio-dot" cx="10" cy="10" r="7.5" />}
        </svg>
      </span>
    );
  }

  // 아이콘-9, 아이콘-10: 글자 아이콘
  if (GLYPHS[name]) {
    return (
      <span className={classNames} {...a11y}>
        {GLYPHS[name]}
      </span>
    );
  }

  const src = IMAGES[name];
  if (!src) return null;

  // SVG 모양을 마스크로 쓰고 글자색으로 칠함
  return (
    <span
      className={`${classNames} icon--svg`}
      style={{ '--icon-src': `url("${src}")` }}
      {...a11y}
    />
  );
}
