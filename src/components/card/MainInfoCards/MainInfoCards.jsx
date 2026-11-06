import { useState } from 'react';
import Button from '../../button/Button/Button';
import InfoCard from '../InfoCard/InfoCard';
import './MainInfoCards.css';

/**
 * MainInfoCards — Figma "메인-정보카드" (데스크탑 node 879:5439 / 모바일 node 879:5488)
 * 페이지 제목(세부페이지제목) + 필터 탭(하위메뉴) + 정보카드 목록(프로그램-정보카드모음)
 *   Property 1=All·Child·Adults·Family → 선택한 필터. 누르면 해당 대상 카드만 보임
 *   데스크탑(768px 이상): 3열, 필터 아래 구분선 / 모바일: 1열, 구분선 없음
 *
 * @param {string} title     페이지 제목 (기본 "Programs & Workshops")
 * @param {object[]} items   카드 목록 (형식은 src/data/programs.js 참고)
 * @param {function} onApply 카드 버튼 클릭 시 (item)을 받음
 * @param {object} filterLabels  필터 글자 바꾸기 { All, Child, Adult, Family }
 * @param {string} groupLabel    필터 묶음 이름 (화면낭독기용, 기본 "Filter by audience")
 * @param {string} emptyText     해당 카드가 없을 때 문구
 * @param {string} titleTag      제목 태그 (기본 'h1' — Figma Heading/H1)
 */
const FILTERS = ['All', 'Child', 'Adult', 'Family'];

const DEFAULT_FILTER_LABELS = {
  All: 'All',
  Child: 'Child',
  Adult: 'Adults',
  Family: 'Family',
};

export default function MainInfoCards({
  title = 'Programs & Workshops',
  items = [],
  onApply,
  filterLabels,
  groupLabel = 'Filter by audience',
  emptyText = 'No programs available.',
  titleTag: TitleTag = 'h1',
  className = '',
}) {
  const [filter, setFilter] = useState('All');
  const labels = { ...DEFAULT_FILTER_LABELS, ...filterLabels };
  const visibleItems = filter === 'All' ? items : items.filter((item) => item.type === filter);

  return (
    <section className={['main-info-cards', className].filter(Boolean).join(' ')}>
      {/* 프로그램-상단메뉴 */}
      <div className="main-info-cards__top">
        <TitleTag className="main-info-cards__title">{title}</TitleTag>

        {/* 하위메뉴: 필터 탭 */}
        <div className="main-info-cards__filters" role="group" aria-label={groupLabel}>
          {FILTERS.map((value) => (
            <Button
              key={value}
              wide={value === 'All'}
              selected={filter === value}
              onClick={() => setFilter(value)}
            >
              {labels[value]}
            </Button>
          ))}
        </div>
      </div>

      {/* 프로그램-정보카드모음 */}
      {visibleItems.length > 0 ? (
        <ul className="main-info-cards__grid">
          {visibleItems.map((item) => (
            <li key={item.id} className="main-info-cards__item">
              <InfoCard
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                type={item.type}
                typeLabel={item.typeLabel}
                title={item.title}
                info={item.info}
                applyLabel={item.buttonLabel}
                buttonVariant={item.buttonVariant}
                onApply={() => onApply?.(item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="main-info-cards__empty" role="status">
          {emptyText}
        </p>
      )}
    </section>
  );
}
