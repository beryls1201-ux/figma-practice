/**
 * 메뉴 데이터 — GNB·Drawer(모바일 메뉴)·LNB가 함께 사용 (docs/CLAUDE.md 4.2, PRD 부록 A)
 * 영문 하위 메뉴 이름은 Figma "메인메뉴(모바일)" 기준
 * menuEn과 menuKo는 대메뉴·하위 메뉴의 순서와 id가 항상 같아야 합니다 (메뉴 동등성)
 *
 * 항목
 *   id        고유 값 (두 언어 공통)
 *   label     메뉴 이름
 *   href      이동 주소 (언어 없이 '/대메뉴id/하위메뉴id')
 *             화면에서는 src/i18n/paths.js의 localizeMenu로 '/en/…', '/ko/…'를 붙여 씀
 *   children  하위 메뉴 목록
 */

export const menuEn = [
  {
    id: 'visitor-info',
    label: 'Visitor Info',
    children: [
      { id: 'hours-admission', label: 'Hours & Admission', href: '/visitor-info/hours-admission' },
      { id: 'group-tour', label: 'Group Tour Reservation', href: '/visitor-info/group-tour' },
      { id: 'venue-rental', label: 'Venue Rental Info', href: '/visitor-info/venue-rental' },
      { id: 'membership', label: 'Membership Info', href: '/visitor-info/membership' },
      { id: 'directions', label: 'Directions', href: '/visitor-info/directions' },
    ],
  },
  {
    id: 'exhibitions',
    label: 'Exhibitions',
    children: [
      { id: 'current-exhibitions', label: 'Current Exhibitions', href: '/exhibitions/current-exhibitions' },
      { id: 'upcoming-exhibitions', label: 'Upcoming Exhibitions', href: '/exhibitions/upcoming-exhibitions' },
      { id: 'past-exhibitions', label: 'Past Exhibitions', href: '/exhibitions/past-exhibitions' },
      { id: 'online-exhibitions', label: 'Online Exhibitions', href: '/exhibitions/online-exhibitions' },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    children: [
      { id: 'programs-workshops', label: 'Programs & Workshops', href: '/education/programs-workshops' },
      { id: 'children-family', label: 'Children & Family', href: '/education/children-family' },
    ],
  },
  {
    id: 'cultural-programs',
    label: 'Cultural Programs',
    children: [{ id: 'events-performances', label: 'Events & Performances', href: '/cultural-programs/events-performances' }],
  },
  {
    id: 'library-collection',
    label: 'Library & Collection',
    children: [
      { id: 'art-library', label: 'Art Library', href: '/library-collection/art-library' },
      { id: 'archive', label: 'Archive', href: '/library-collection/archive' },
      { id: 'collection', label: 'Collection', href: '/library-collection/collection' },
    ],
  },
  {
    id: 'news-pr',
    label: 'News & PR',
    children: [
      { id: 'news', label: 'News', href: '/news-pr/news' },
      { id: 'press-releases', label: 'Press Releases', href: '/news-pr/press-releases' },
      { id: 'newsletter', label: 'Newsletter', href: '/news-pr/newsletter' },
      { id: 'faq', label: 'FAQ', href: '/news-pr/faq' },
      { id: 'survey', label: 'Survey', href: '/news-pr/survey' },
    ],
  },
  {
    id: 'about-museum',
    label: 'About Museum',
    children: [
      { id: 'greetings', label: 'Greetings/Introduction', href: '/about-museum/greetings' },
      { id: 'suwon-museum-of-art', label: 'Suwon Museum of Art', href: '/about-museum/suwon-museum-of-art' },
      { id: 'manseok-gallery', label: 'Suwon Manseok Gallery', href: '/about-museum/manseok-gallery' },
      { id: 'art-space-gwanggyo', label: 'Suwon Art Space Gwanggyo', href: '/about-museum/art-space-gwanggyo' },
      { id: 'northern-gallery', label: 'Suwon Northern Gallery', href: '/about-museum/northern-gallery' },
    ],
  },
];

/**
 * 국문 메뉴 — Figma 문구 변수 "Text(Language)" 한국어 모드 기준 (PRD 부록 A와 같음)
 */
export const menuKo = [
  {
    id: 'visitor-info',
    label: '관람 안내',
    children: [
      { id: 'hours-admission', label: '이용 안내', href: '/visitor-info/hours-admission' },
      { id: 'group-tour', label: '단체 관람 예약', href: '/visitor-info/group-tour' },
      { id: 'venue-rental', label: '대관 안내', href: '/visitor-info/venue-rental' },
      { id: 'membership', label: '멤버십 안내', href: '/visitor-info/membership' },
      { id: 'directions', label: '오시는 길', href: '/visitor-info/directions' },
    ],
  },
  {
    id: 'exhibitions',
    label: '전시',
    children: [
      { id: 'current-exhibitions', label: '현재 전시', href: '/exhibitions/current-exhibitions' },
      { id: 'upcoming-exhibitions', label: '예정 전시', href: '/exhibitions/upcoming-exhibitions' },
      { id: 'past-exhibitions', label: '지난 전시', href: '/exhibitions/past-exhibitions' },
      { id: 'online-exhibitions', label: '온라인 전시', href: '/exhibitions/online-exhibitions' },
    ],
  },
  {
    id: 'education',
    label: '교육',
    children: [
      { id: 'programs-workshops', label: '프로그램 및 워크숍', href: '/education/programs-workshops' },
      { id: 'children-family', label: '어린이 및 가족', href: '/education/children-family' },
    ],
  },
  {
    id: 'cultural-programs',
    label: '문화 프로그램',
    children: [{ id: 'events-performances', label: '행사 및 공연', href: '/cultural-programs/events-performances' }],
  },
  {
    id: 'library-collection',
    label: '라이브러리 및 소장품',
    children: [
      { id: 'art-library', label: '아트 라이브러리', href: '/library-collection/art-library' },
      { id: 'archive', label: '아카이브', href: '/library-collection/archive' },
      { id: 'collection', label: '소장품', href: '/library-collection/collection' },
    ],
  },
  {
    id: 'news-pr',
    label: '뉴스 및 홍보',
    children: [
      { id: 'news', label: '뉴스', href: '/news-pr/news' },
      { id: 'press-releases', label: '보도자료', href: '/news-pr/press-releases' },
      { id: 'newsletter', label: '뉴스레터', href: '/news-pr/newsletter' },
      { id: 'faq', label: '자주 묻는 질문', href: '/news-pr/faq' },
      { id: 'survey', label: '설문조사', href: '/news-pr/survey' },
    ],
  },
  {
    id: 'about-museum',
    label: '미술관 소개',
    children: [
      { id: 'greetings', label: '인사말/소개', href: '/about-museum/greetings' },
      { id: 'suwon-museum-of-art', label: '수원시립미술관', href: '/about-museum/suwon-museum-of-art' },
      { id: 'manseok-gallery', label: '수원만석전시관', href: '/about-museum/manseok-gallery' },
      { id: 'art-space-gwanggyo', label: '수원아트스페이스광교', href: '/about-museum/art-space-gwanggyo' },
      { id: 'northern-gallery', label: '수원북부전시관', href: '/about-museum/northern-gallery' },
    ],
  },
];
