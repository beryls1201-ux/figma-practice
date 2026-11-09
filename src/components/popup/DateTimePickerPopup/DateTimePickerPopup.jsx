import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from '../../icon/Icon/Icon';
import ButtonSmall from '../../button/ButtonSmall/ButtonSmall';
import './DateTimePickerPopup.css';

/**
 * DateTimePickerPopup — Figma "방문일자 & 시간 선택입력 팝업창" (node 879:4918)
 *   Property 1=데스크탑(가로형) → 768px 이상: 달력 | 시간 입력 가로 배치 (648px)
 *   Property 1=모바일(세로)     → 767px 이하: 달력 위, 시간 입력 아래 (328px)
 * 화면에 띄울 때는 <Modal>로 감싸서 사용
 *
 * 동작
 *   - ‹ › 버튼으로 월 이동, 날짜를 누르면 선택 (minDate 이전 날짜는 회색 배경 + 선택 불가)
 *   - 시간: startTime~endTime을 timeStep분 간격으로 나열한 목록을 스크롤해서 선택
 *     (실제 관람시간 기준 10:00~17:00, 30분 — 사용자 결정 2026-11-09)
 *   - OK: 선택한 날짜·시간을 Date로 onConfirm에 전달 / Cancel: onCancel
 *   - Figma의 연필(edit)·키보드(keyboard)·월 옆 ▼ 아이콘은 동작이 정해지지 않아 제외
 *
 * @param {string} titleId      제목 id (Modal의 labelledBy와 같은 값). 없으면 자동 생성
 * @param {Date} defaultValue   처음 선택돼 있을 날짜·시간 (없으면 날짜 미선택, 첫 시간)
 * @param {Date} minDate        선택 가능한 첫 날짜 (기본: 오늘)
 * @param {string} startTime    첫 시간 (기본 '10:00')
 * @param {string} endTime      마지막 시간 (기본 '17:00')
 * @param {number} timeStep     시간 간격(분) (기본 30)
 * @param {function} onConfirm  OK 클릭 시 (Date)를 받음
 * @param {function} onCancel   Cancel 클릭 시
 * @param {string} locale       날짜 표기 언어 (기본 'en-US', 국문 화면은 'ko-KR')
 * @param {object} labels       문구 바꾸기 (title, time, cancel, ok, prevMonth, nextMonth, noDate)
 */
const DEFAULT_LABELS = {
  title: 'Select Date & Time',
  time: 'Enter Time (Only play time)',
  cancel: 'Cancel',
  ok: 'OK',
  prevMonth: 'Previous month',
  nextMonth: 'Next month',
  noDate: 'Select a date',
};

// 날짜 비교용: 시간을 0시로 맞춤
const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isSameDay = (a, b) => a && b && startOfDay(a).getTime() === startOfDay(b).getTime();

// 달력 칸 목록: 앞쪽 빈칸(null) + 1일~말일
function getMonthCells(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= lastDate; day += 1) cells.push(new Date(year, month, day));
  return cells;
}

// '10:30' → 630 (자정부터 몇 분)
const toMinutes = (text) => {
  const [h, m] = text.split(':').map(Number);
  return h * 60 + m;
};

export default function DateTimePickerPopup({
  titleId,
  defaultValue,
  minDate,
  startTime = '10:00',
  endTime = '17:00',
  timeStep = 30,
  onConfirm,
  onCancel,
  locale = 'en-US',
  labels: customLabels,
  className = '',
}) {
  const labels = { ...DEFAULT_LABELS, ...customLabels };
  const autoId = useId();
  const headingId = titleId ?? autoId;

  // 오늘 날짜는 팝업이 처음 열릴 때 한 번만 읽음
  const [today] = useState(() => startOfDay(new Date()));
  const min = minDate ? startOfDay(minDate) : today;
  const initial = defaultValue ?? null;

  const [selected, setSelected] = useState(initial ? startOfDay(initial) : null);
  const [view, setView] = useState(() => {
    const base = initial ?? min;
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  // 시간 목록 (자정부터 몇 분인지로 저장: 10:30 → 630)
  const timeSlots = useMemo(() => {
    const list = [];
    for (let m = toMinutes(startTime); m <= toMinutes(endTime); m += timeStep) list.push(m);
    return list;
  }, [startTime, endTime, timeStep]);
  const [time, setTime] = useState(() => {
    const wanted = initial ? initial.getHours() * 60 + initial.getMinutes() : null;
    return timeSlots.includes(wanted) ? wanted : timeSlots[0];
  });
  const timeListRef = useRef(null);
  const timeName = `${autoId}-time`;

  // 표기용 포맷
  const format = useMemo(
    () => ({
      header: new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'short', day: 'numeric' }),
      month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
      full: new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: 'narrow' }),
      weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' }),
      time: new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }),
    }),
    [locale],
  );

  // 요일 머리글 (일요일부터). 2023-01-01은 일요일
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + i));
  const cells = getMonthCells(view.year, view.month);
  const viewDate = new Date(view.year, view.month, 1);
  const canGoPrev = viewDate > new Date(min.getFullYear(), min.getMonth(), 1);

  const moveMonth = (step) => {
    const next = new Date(view.year, view.month + step, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  const handleConfirm = () => {
    if (!selected) return;
    const result = new Date(selected);
    result.setHours(Math.floor(time / 60), time % 60, 0, 0);
    onConfirm?.(result);
  };

  // 시간 칸 표기: 영문 "10:30 AM", 국문 "오전 10:30"
  const formatSlot = (minutes) =>
    format.time.format(new Date(2000, 0, 1, Math.floor(minutes / 60), minutes % 60));

  // 팝업이 열릴 때 선택된 시간이 목록 안에 보이도록 스크롤
  useEffect(() => {
    timeListRef.current
      ?.querySelector('.date-time-picker__time-option--selected')
      ?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div className={['date-time-picker', className].filter(Boolean).join(' ')}>
      {/* Date Picker 머리 영역 */}
      <div className="date-time-picker__header">
        <h2 id={headingId} className="date-time-picker__title">
          {labels.title}
        </h2>
        <p className="date-time-picker__selected" aria-live="polite">
          {selected ? format.header.format(selected) : labels.noDate}
        </p>
      </div>

      <div className="date-time-picker__content">
        {/* 달력 */}
        <div className="date-time-picker__calendar">
          <div className="date-time-picker__month-bar">
            <p className="date-time-picker__month" aria-live="polite">
              {format.month.format(viewDate)}
            </p>
            <div className="date-time-picker__nav">
              <button
                type="button"
                className="date-time-picker__nav-button"
                onClick={() => moveMonth(-1)}
                disabled={!canGoPrev}
              >
                <Icon name="keyboard-arrow-left" label={labels.prevMonth} />
              </button>
              <button
                type="button"
                className="date-time-picker__nav-button"
                onClick={() => moveMonth(1)}
              >
                <Icon name="keyboard-arrow-right" label={labels.nextMonth} />
              </button>
            </div>
          </div>

          <div className="date-time-picker__grid">
            {weekdays.map((day) => (
              <abbr
                key={day.getDay()}
                className="date-time-picker__weekday"
                title={format.weekdayLong.format(day)}
              >
                {format.weekday.format(day)}
              </abbr>
            ))}

            {cells.map((date, index) => {
              if (!date) return <span key={`empty-${index}`} aria-hidden="true" />;
              const isPast = date < min;
              const isSelected = isSameDay(date, selected);
              return (
                <button
                  key={date.getDate()}
                  type="button"
                  className={[
                    'date-time-picker__day',
                    isSelected && 'date-time-picker__day--selected',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={format.full.format(date)}
                  aria-pressed={isSelected}
                  disabled={isPast}
                  onClick={() => setSelected(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Picker */}
        <div className="date-time-picker__time">
          <fieldset className="date-time-picker__time-group">
            <legend className="date-time-picker__time-title">{labels.time}</legend>

            {/* 시간 목록: 위아래로 스크롤해서 선택 (라디오 버튼이라 화살표 키로도 이동) */}
            <div ref={timeListRef} className="date-time-picker__time-list">
              {timeSlots.map((slot) => {
                const isSelected = slot === time;
                return (
                  <label
                    key={slot}
                    className={[
                      'date-time-picker__time-option',
                      isSelected && 'date-time-picker__time-option--selected',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <input
                      type="radio"
                      name={timeName}
                      value={slot}
                      checked={isSelected}
                      onChange={() => setTime(slot)}
                      className="sr-only"
                    />
                    {formatSlot(slot)}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="date-time-picker__actions">
            <ButtonSmall variant="text" onClick={onCancel}>
              {labels.cancel}
            </ButtonSmall>
            <ButtonSmall variant="filled" onClick={handleConfirm} disabled={!selected}>
              {labels.ok}
            </ButtonSmall>
          </div>
        </div>
      </div>
    </div>
  );
}
