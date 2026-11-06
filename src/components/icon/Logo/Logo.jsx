import logo from '../../../assets/images/logo.png';
import './Logo.css';

/**
 * Logo — Figma "로고" (node 879:6273)
 *   Property 1=모바일   → 심볼만 보이게 이미지를 잘라서 표시
 *   Property 1=데스크탑 → 심볼 + 기관명 전체 표시
 *
 * @param {'auto'|'mobile'|'desktop'} variant
 *   auto(기본): 767px 이하 모바일, 768px 이상 데스크탑 모양
 * @param {string} alt  대체 텍스트 (영문 화면에서는 "Suwon Museum of Art")
 */
export default function Logo({
  variant = 'auto',
  alt = '수원시립미술관',
  className = '',
}) {
  const classNames = ['logo', `logo--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      <span className="logo__frame">
        <img src={logo} alt={alt} className="logo__image" />
      </span>
    </span>
  );
}
