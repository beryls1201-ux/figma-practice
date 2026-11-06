import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/navigation/Breadcrumb/Breadcrumb';
import useLanguage from '../../i18n/useLanguage';
import { withLang } from '../../i18n/paths';
import '../PageTop.css';
import './ComingSoonPage.css';

/**
 * ComingSoonPage — 아직 디자인(Figma)이 없는 메뉴를 열었을 때 보여 주는 안내
 * Figma에 없는 화면이라 기존 스타일(현재 위치 줄, 제목, 본문)만 사용
 *
 * @param {string} title  메뉴 이름 (현재 위치·제목에 표시, 없으면 "준비 중")
 */
export default function ComingSoonPage({ title }) {
  const { lang, t } = useLanguage();
  const heading = title || t('comingSoonTitle');

  return (
    <div className="coming-soon-page">
      <div className="page-top">
        <Breadcrumb
          label={t('breadcrumbLabel')}
          items={[{ label: t('Address1'), href: withLang(lang) }, { label: heading }]}
        />
      </div>

      <main className="coming-soon-page__main">
        <h1 className="coming-soon-page__title">{heading}</h1>
        <p className="coming-soon-page__body">{t('comingSoonBody')}</p>
        <Link to={withLang(lang)} className="coming-soon-page__link">
          {t('Message_button1')}
        </Link>
      </main>
    </div>
  );
}
