import { useId, useMemo, useState } from 'react';
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
 *   - ‹ › 버튼으로 월 이동, 날짜를 누르면 선택 (오늘 이전 날짜는 선택 불가)
 *   - 시(1~12)·분(00~59) 입력, AM/PM 선택
 *   - OK: 선택한 날짜·시간을 Date로 onConfirm에 전달 / Cancel: onCancel
 *   - Figma의 연필(edit)·키보드(keyboard)·월 옆 ▼ 아이콘은 동작이 정해지지 않아 제외
 *
 * @param {string} titleId      제목 id (Modal의 labelledBy와 같은 값). 없으면 자동 생성
 * @param {Date} defaultValue   처음 선택돼 있을 날짜·시간 (없으면 날짜 미선택, 10:00 AM)
 * @param {Date} minDate        선택 가능한 첫 날짜 (기본: 오늘)
 * @param {function} onConfirm  OK 클릭 시 (Date)를 받음
 * @param {function} onCancel   Cancel 클릭 시
 * @param {string} locale       날짜 표기 언어 (기본 'en-US', 국문 화면은 'ko-KR')
 * @param {object} labels       문구 바꾸기 (title, time, hour, minute, am, pm, cancel, ok, prevMonth, nextMonth, noDate)
 */
const DEFAULT_LABELS = {
  title: 'Select Date & Time',
  time: 'Enter Time (Only play time)',
  hour: 'Hour',
  minute: 'Minute',
  cancel: 'Cancel',
  ok: 'OK',
  prevMonth: 'Previous month',
  nextMonth: 'Next month',
  noDate: 'Select a date',
  am: 'AM',
  pm: 'PM',
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

const pad2 = (value) => String(value).padStart(2, '0');

export default function DateTimePickerPopup({
  titleId,
  defaultValue,
  minDate,
  onConfirm,
  onCancel,
  locale = 'en-US',
  labels: customLabels,
  className = '',
}) {
  const labels = { ...DEFAULT_LABELS, ...customLabels };
  const autoId = useId();
  const headingId = titleId ?? autoId;
  const hourId = `${autoId}-hour`;
  const minuteId = `${autoId}-minute`;

  // 오늘 날짜는 팝업이 처음 열릴 때 한 번만 읽음
  const [today] = useState(() => startOfDay(new Date()));
  const min = minDate ? startOfDay(minDate) : today;
  const initial = defaultValue ?? null;

  const [selected, setSelected] = useState(initial ? startOfDay(initial) : null);
  const [view, setView] = useState(() => {
    const base = initial ?? min;
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const initialHour24 = initial ? initial.getHours() : 10;
  const [hour, setHour] = useState(String(initialHour24 % 12 || 12));
  const [minute, setMinute] = useState(pad2(initial ? initial.getMinutes() : 0));
  const [period, setPeriod] = useState(initialHour24 >= 12 ? 'PM' : 'AM');

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

  // 입력값 정리: 범위를 벗어나면 가장 가까운 값으로
  const fixHour = () => {
    const value = Number.parseInt(hour, 10);
    setHour(String(Number.isNaN(value) ? 12 : Math.min(Math.max(value, 1), 12)));
  };
  const fixMinute = () => {
    const value = Number.parseInt(minute, 10);
    setMinute(pad2(Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 59)));
  };

  const handleConfirm = () => {
    if (!selected) return;
    const h = Math.min(Math.max(Number.parseInt(hour, 10) || 12, 1), 12);
    const m = Math.min(Math.max(Number.parseInt(minute, 10) || 0, 0), 59);
    const hour24 = (h % 12) + (period === 'PM' ? 12 : 0);
    const result = new Date(selected);
    result.setHours(hour24, m, 0, 0);
    onConfirm?.(result);
  };

  const onlyDigits = (setter) => (event) => setter(event.target.value.replace(/\D/g, '').slice(0, 2));

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

            <div className="date-time-picker__time-input">
              <div className="date-time-picker__field">
                <input
                  id={hourId}
                  className="date-time-picker__number"
                  inputMode="numeric"
                  autoComplete="off"
                  value={hour}
                  onChange={onlyDigits(setHour)}
                  onBlur={fixHour}
                />
                <label htmlFor={hourId} className="date-time-picker__unit">
                  {labels.hour}
                </label>
              </div>

              <span className="date-time-picker__colon">
                <Icon name="colon" />
              </span>

              <div className="date-time-picker__field">
                <input
                  id={minuteId}
                  className="date-time-picker__number"
                  inputMode="numeric"
                  autoComplete="off"
                  value={minute}
                  onChange={onlyDigits(setMinute)}
                  onBlur={fixMinute}
                />
                <label htmlFor={minuteId} className="date-time-picker__unit">
                  {labels.minute}
                </label>
              </div>

              {/* AM/PM Selector */}
              <div className="date-time-picker__period" role="group" aria-label="AM / PM">
                {['AM', 'PM'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={[
                      'date-time-picker__period-button',
                      period === value && 'date-time-picker__period-button--selected',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={period === value}
                    onClick={() => setPeriod(value)}
                  >
                    {value === 'AM' ? labels.am : labels.pm}
                  </button>
                ))}
              </div>
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
