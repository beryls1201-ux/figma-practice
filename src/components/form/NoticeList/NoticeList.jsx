import './NoticeList.css';

/**
 * NoticeList — Figma "유의사항" (유의사항문구)
 * 파란 글자 점(•) 목록 (Body/Small 15px, GNB&LNB/Info_text)
 *
 * @param {string[]} items  안내 문구 목록
 *   Figma 예시: ['Group size: 10 to 30 visitors',
 *               'Online reservation is required at least 7 days before your visit.']
 */
export default function NoticeList({ items = [], className = '' }) {
  return (
    <ul className={['notice-list', className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <li key={item} className="notice-list__item">
          {item}
        </li>
      ))}
    </ul>
  );
}
