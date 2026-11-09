import './Footer.css';

/**
 * Footer — 사이트 하단 (Figma 시안 없음 → 실제 사이트 내용 + 프로젝트 토큰으로 구성)
 *   모바일·데스크탑 모두: SNS 아이콘 / 정책 링크 / 주소·전화 / 저작권을 위에서 아래로 쌓음
 *   데스크탑(768px 이상)은 여백·글자 크기만 커지고, 주소·전화가 한 줄
 *
 * @param {{id, label, href}[]} policyLinks  정책 링크 (새 창)
 * @param {{id, label, href, iconSrc}[]} snsLinks     SNS 링크 (새 창)
 * @param {string} policyLabel  정책 링크 묶음 이름 (화면낭독기용)
 * @param {string} snsLabel     SNS 묶음 이름 (화면낭독기용)
 * @param {string} newWindowText 새 창 안내 (화면낭독기용, 예: "(새 창)")
 * @param {string} address      주소
 * @param {string} tel          전화 표시 문구
 * @param {string} telHref      전화 걸기 주소 (tel:…)
 * @param {string} notice       무단 복제 금지 안내
 * @param {string} copyright    저작권 문구
 */
export default function Footer({
  policyLinks = [],
  snsLinks = [],
  policyLabel,
  snsLabel,
  newWindowText,
  address,
  tel,
  telHref,
  notice,
  copyright,
  className = '',
}) {
  return (
    <footer className={['site-footer', className].filter(Boolean).join(' ')}>
      <div className="site-footer__top">
        {/* SNS: 아이콘 이미지의 alt가 링크 이름이 됨 */}
        <ul className="site-footer__sns" aria-label={snsLabel}>
          {snsLinks.map((sns) => (
            <li key={sns.id}>
              <a href={sns.href} target="_blank" rel="noopener noreferrer" className="site-footer__sns-link">
                <img src={sns.iconSrc} alt={sns.label} className="site-footer__sns-icon" />
                <span className="sr-only"> {newWindowText}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* 정책 링크 */}
        <nav aria-label={policyLabel}>
          <ul className="site-footer__policies">
            {policyLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={['site-footer__policy', link.id === 'privacy' && 'site-footer__policy--strong']
                    .filter(Boolean)
                    .join(' ')}
                >
                  {link.label}
                  <span className="sr-only"> {newWindowText}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <address className="site-footer__contact">
          <span>{address}</span>
          <a href={telHref} className="site-footer__tel">
            {tel}
          </a>
        </address>
        <div className="site-footer__legal">
          <p>{notice}</p>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
