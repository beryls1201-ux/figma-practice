import './MenuNotice.css';

/**
 * MenuNotice — Figma "메뉴-유의사항" (메인메뉴(데스크탑) 펼침 아래 공지 상자)
 * 연한 주황 배경 + 주황 테두리 + 진한 갈색 글자 (Caption/Regular 15px)
 *
 * @param {React.ReactNode} children  공지 문구
 *   Figma 예시(영문): "Notice: Free admission and extended hours until 9:00 PM on the last
 *   Wednesday of every month (‘Culture Day’)."
 *   Figma 예시(국문): "공지: 매월 마지막 수요일 '문화가 있는 날'에는 무료 관람과 야간 개관(오후 9시까지)을 운영합니다."
 */
export default function MenuNotice({ children, className = '' }) {
  return (
    <div className={['menu-notice', className].filter(Boolean).join(' ')}>
      <p className="menu-notice__box">{children}</p>
    </div>
  );
}
