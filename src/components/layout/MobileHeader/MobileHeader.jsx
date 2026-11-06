import Logo from '../../icon/Logo/Logo';
import './MobileHeader.css';

/**
 * MobileHeader — Figma "헤더-상단메뉴" (모바일-메인 node 264:9847, 모바일-메인메뉴 node 264:9855)
 * 왼쪽 로고(홈 링크) + 오른쪽 버튼 영역(상단우측메뉴)
 *
 * @param {string} homeHref   로고를 눌렀을 때 이동할 주소
 * @param {string} homeLabel  로고 링크 이름 (기본 "Suwon Museum of Art", 국문 "수원시립미술관")
 * @param {React.ReactNode} children  오른쪽 버튼들 (예: <LanguageSelect />, <Button2 />)
 */
export default function MobileHeader({
  homeHref = '/',
  homeLabel = 'Suwon Museum of Art',
  children,
  className = '',
}) {
  return (
    <header className={['mobile-header', className].filter(Boolean).join(' ')}>
      <a href={homeHref} className="mobile-header__home">
        <Logo variant="mobile" alt={homeLabel} />
      </a>
      {/* 상단우측메뉴 */}
      <div className="mobile-header__actions">{children}</div>
    </header>
  );
}
