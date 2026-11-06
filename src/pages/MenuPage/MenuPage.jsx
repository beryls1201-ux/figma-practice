import MobileHeader from '../../components/layout/MobileHeader/MobileHeader';
import Button2 from '../../components/button/Button2/Button2';
import MobileMainMenu from '../../components/navigation/MobileMainMenu/MobileMainMenu';
import { menuEn, menuKo } from '../../data/menu';
import useLanguage from '../../i18n/useLanguage';
import { localizeMenu, withLang } from '../../i18n/paths';

/**
 * MenuPage — Figma "모바일-메인메뉴" (node 264:9854)
 * 헤더(로고 · Close 버튼) + 메뉴 목록 (모두 접힘)
 * 문구는 현재 언어(useLanguage)에 따라 바뀜
 *
 * @param {function} onClose    Close 버튼을 눌렀을 때 (이전 화면으로)
 * @param {string} currentId    현재 페이지의 하위 메뉴 id (해당 대메뉴가 펼쳐짐)
 */
export default function MenuPage({ onClose, currentId }) {
  const { lang, t } = useLanguage();

  return (
    <div className="menu-page">
      <MobileHeader homeHref={withLang(lang)} homeLabel={t('siteName')}>
        <Button2 type="close" aria-expanded={true} onClick={onClose} autoFocus>
          {t('Close')}
        </Button2>
      </MobileHeader>

      <main>
        <h1 className="sr-only">{t('button1')}</h1>
        <MobileMainMenu
          items={localizeMenu(lang === 'ko' ? menuKo : menuEn, lang)}
          currentId={currentId}
          label={t('mainMenuLabel')}
        />
      </main>
    </div>
  );
}
