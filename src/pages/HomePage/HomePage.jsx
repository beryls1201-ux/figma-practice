import MobileHeader from '../../components/layout/MobileHeader/MobileHeader';
import DesktopHeader from '../../components/layout/DesktopHeader/DesktopHeader';
import SearchButton from '../../components/button/SearchButton/SearchButton';
import LanguageSelect from '../../components/navigation/LanguageSelect/LanguageSelect';
import Button2 from '../../components/button/Button2/Button2';
import MainBannerSlider from '../../components/card/MainBannerSlider/MainBannerSlider';
import { bannersEn, bannersKo } from '../../data/banners';
import logoKo from '../../assets/images/logo.png';
import logoEn from '../../assets/images/logo_en.png';
import { menuEn, menuKo } from '../../data/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import useLanguage from '../../i18n/useLanguage';
import { localizeMenu, swapLanguage, withLang } from '../../i18n/paths';
import './HomePage.css';

/**
 * HomePage — 메인
 *   모바일: Figma "모바일-메인" (node 264:9846) — 헤더(로고 · 언어선택 · Menu) + 배너
 *   데스크탑(768px 이상): Figma "데크스탑-메인" (node 231:1184)
 *     헤더-상단고정메뉴(로고 · Search · 언어선택 + 대메뉴 탭) + 배너
 *   배너는 3개 자동 슬라이드 (MainBannerSlider, 실제 사이트 메인과 같은 방식)
 * 문구는 현재 언어(useLanguage)에 따라 바뀜
 *
 * @param {function} onOpenMenu  모바일 Menu 버튼을 눌렀을 때 (모바일-메인메뉴 화면 열기)
 */
export default function HomePage({ onOpenMenu }) {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  // 언어를 고르면 같은 화면의 다른 언어 주소로 이동 (/en ↔ /ko)
  const changeLanguage = (next) => navigate(swapLanguage(location.pathname, next));
  const banners = lang === 'ko' ? bannersKo : bannersEn;
  const menu = localizeMenu(lang === 'ko' ? menuKo : menuEn, lang);

  // 언어선택 목록: Figma 문구 변수 button2-1(영어)·button2-2(한국어), 현재 화면 언어로 표시
  const languageOptions = [
    { value: 'en', label: t('button2-1'), name: t('langEnglish') },
    { value: 'ko', label: t('button2-2'), name: t('langKorean') },
  ];

  return (
    <div className="home-page">
      <MobileHeader className="home-page__mobile-header" homeHref={withLang(lang)} homeLabel={t('siteName')}>
        <LanguageSelect
          value={lang}
          onChange={changeLanguage}
          options={languageOptions}
          label={t('languageLabel')}
        />
        <Button2 type="menu" aria-expanded={false} onClick={onOpenMenu}>
          {t('button1')}
        </Button2>
      </MobileHeader>

      <DesktopHeader
        className="home-page__desktop-header"
        homeHref={withLang(lang)}
        homeLabel={t('siteName')}
        logoSrc={lang === 'ko' ? logoKo : logoEn}
        menuItems={menu}
        menuLabel={t('mainMenuLabel')}
        notice={t('Experience1')}
      >
        <SearchButton>{t('button3')}</SearchButton>
        <LanguageSelect
          value={lang}
          onChange={changeLanguage}
          options={languageOptions}
          label={t('languageLabel')}
        />
      </DesktopHeader>

      <main>
        <h1 className="sr-only">{t('siteName')}</h1>
        <MainBannerSlider
          slides={banners}
          label={t('bannerSliderLabel')}
          goToLabel={(n) => t('bannerGoTo', { n })}
        />
      </main>
    </div>
  );
}
