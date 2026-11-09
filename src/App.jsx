import { useEffect, useMemo, useState } from 'react'
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import MenuPage from './pages/MenuPage/MenuPage'
import ProgramsPage from './pages/ProgramsPage/ProgramsPage'
import GroupTourPage from './pages/GroupTourPage/GroupTourPage'
import ComingSoonPage from './pages/ComingSoonPage/ComingSoonPage'
import Footer from './components/layout/Footer/Footer'
import { menuEn, menuKo } from './data/menu'
import { policyLinks, snsLinks, telHref } from './data/footer'
import { LanguageContext } from './i18n/languageContext'
import useLanguage from './i18n/useLanguage'
import { LANGUAGES, translate } from './i18n/strings'
import { currentMenuId, swapLanguage, withLang } from './i18n/paths'

/**
 * 화면 주소 (react-router-dom) — 언어를 주소 맨 앞에 둠
 *   /                                → 기억된 언어(없으면 영어)의 메인으로 이동
 *   /en, /ko                         → 메인
 *   /:lang/education/programs-workshops → 교육 프로그램 목록
 *   /:lang/visitor-info/group-tour      → 단체 관람 예약
 *   /:lang/그 밖의 주소                  → 준비 중 안내 (디자인이 없는 메뉴)
 * 모바일 메뉴(모바일-메인메뉴)는 주소 없이 화면 위에 열고 닫음
 *
 * 배포 시: 어떤 주소로 들어와도 index.html을 보내 주는 서버 설정이 필요함
 */

/**
 * 데스크탑 비례 축소 (PRD 5.6, B-18)
 * 768px 이상에서 1920px 시안을 같은 비율로 줄여 보여 줌 (global.css의 body zoom)
 *   비율 = 화면 너비 ÷ 1920, 최소 0.7(약 1344px 이하는 70%에서 멈춤) · 최대 1(1920px 이상은 원래 크기)
 */
const DESIGN_WIDTH = 1920
const MIN_SCALE = 0.7

const updatePageZoom = () => {
  const scale = Math.min(1, Math.max(MIN_SCALE, window.innerWidth / DESIGN_WIDTH))
  document.documentElement.style.setProperty('--page-zoom', String(scale))
}

// 화면 안의 일반 링크(<a href="/…">)를 누르면 페이지를 새로 불러오지 않고 주소만 바꿈
function useLinkInterceptor() {
  const navigate = useNavigate()
  return (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest?.('a[href]')
    if (!link || link.target || link.hasAttribute('download')) return
    const href = link.getAttribute('href')
    if (!href.startsWith('/')) return
    event.preventDefault()
    navigate(href)
  }
}

/** 주소의 언어(/en, /ko)를 화면 언어로 쓰는 틀 */
function LanguageLayout() {
  const { lang: urlLang } = useParams()
  const { lang: savedLang, setLang } = useLanguage()
  const location = useLocation()
  const handleClick = useLinkInterceptor()
  const [menuOpen, setMenuOpen] = useState(false)
  const isValid = LANGUAGES.includes(urlLang)

  // 주소 언어를 기억하고 <html lang>에 반영
  useEffect(() => {
    if (isValid && urlLang !== savedLang) setLang(urlLang)
  }, [isValid, urlLang, savedLang, setLang])

  // 주소가 바뀌면 메뉴를 닫고 맨 위로
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMenuOpen(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // 이 틀 안에서는 항상 주소의 언어로 글자를 꺼냄 (기억된 언어가 바뀌기 전에도 바로 맞게)
  const value = useMemo(
    () => ({ lang: urlLang, setLang, t: (key, vars) => translate(urlLang, key, vars) }),
    [urlLang, setLang],
  )

  // 언어가 없는 주소(/visitor-info/…)는 언어를 붙여서 다시 이동
  if (!isValid) return <Navigate to={swapLanguage(location.pathname, savedLang)} replace />

  return (
    <LanguageContext.Provider value={value}>
      <div className="page-frame" onClick={handleClick}>
        {menuOpen ? (
          <MenuPage
            currentId={currentMenuId(location.pathname)}
            onClose={() => setMenuOpen(false)}
          />
        ) : (
          <>
            <Outlet context={{ openMenu: () => setMenuOpen(true) }} />
            {/* 모든 화면 공통 푸터 (모바일 메뉴 화면에서는 숨김) */}
            <SiteFooter t={value.t} />
          </>
        )}
      </div>
    </LanguageContext.Provider>
  )
}

// 푸터: 데이터(src/data/footer.js)의 문구 키를 현재 언어 글자로 바꿔 넘김
function SiteFooter({ t }) {
  return (
    <Footer
      policyLinks={policyLinks.map((link) => ({ ...link, label: t(link.labelKey) }))}
      snsLinks={snsLinks.map((sns) => ({ ...sns, label: t(sns.labelKey) }))}
      policyLabel={t('footerPolicyLabel')}
      snsLabel={t('footerSnsLabel')}
      newWindowText={t('newWindow')}
      address={t('footerAddress')}
      tel={t('footerTel')}
      telHref={telHref}
      notice={t('footerNotice')}
      copyright={t('footerCopyright')}
    />
  )
}

function RootRedirect() {
  const { lang } = useLanguage()
  return <Navigate to={withLang(lang)} replace />
}

function HomeRoute() {
  const { openMenu } = useOutletContext()
  return <HomePage onOpenMenu={openMenu} />
}

function ProgramsRoute() {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  return <ProgramsPage onApply={() => navigate(withLang(lang, '/visitor-info/group-tour'))} />
}

// 디자인이 없는 메뉴: 메뉴 이름을 찾아 "준비 중" 안내
function ComingSoonRoute() {
  const { lang } = useLanguage()
  const location = useLocation()
  const id = currentMenuId(location.pathname)
  const menu = lang === 'ko' ? menuKo : menuEn
  const item = menu.flatMap((section) => section.children).find((child) => child.id === id)
  return <ComingSoonPage title={item?.label} />
}

function App() {
  // 화면 너비가 바뀔 때마다 비례 축소 비율 다시 계산
  useEffect(() => {
    updatePageZoom()
    window.addEventListener('resize', updatePageZoom)
    return () => window.removeEventListener('resize', updatePageZoom)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path=":lang" element={<LanguageLayout />}>
        <Route index element={<HomeRoute />} />
        <Route path="education/programs-workshops" element={<ProgramsRoute />} />
        <Route path="visitor-info/group-tour" element={<GroupTourPage />} />
        <Route path="*" element={<ComingSoonRoute />} />
      </Route>
    </Routes>
  )
}

export default App
