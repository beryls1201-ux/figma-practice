import { useState } from 'react';
import Breadcrumb from '../../components/navigation/Breadcrumb/Breadcrumb';
import DesktopSideMenu from '../../components/navigation/DesktopSideMenu/DesktopSideMenu';
import NoticeList from '../../components/form/NoticeList/NoticeList';
import FormField from '../../components/form/FormField/FormField';
import DateInput from '../../components/form/DateInput/DateInput';
import TextInput from '../../components/form/TextInput/TextInput';
import NumberStepper from '../../components/form/NumberStepper/NumberStepper';
import Checkbox from '../../components/form/Checkbox/Checkbox';
import Button from '../../components/button/Button/Button';
import Modal from '../../components/popup/Modal/Modal';
import DateTimePickerPopup from '../../components/popup/DateTimePickerPopup/DateTimePickerPopup';
import ErrorMessagePopup from '../../components/popup/ErrorMessagePopup/ErrorMessagePopup';
import BookingSuccessPopup from '../../components/popup/BookingSuccessPopup/BookingSuccessPopup';
import { menuEn, menuKo } from '../../data/menu';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../../i18n/useLanguage';
import { localizeMenu, withLang } from '../../i18n/paths';
import { LOCALES, formatFieldDate, formatSummaryDate } from '../../i18n/format';
import '../PageTop.css';
import './GroupTourPage.css';

/**
 * GroupTourPage — 단체 관람 예약
 *   모바일: Figma "모바일-세부메뉴(단체 관람 예약)" (node 264:9867)
 *   데스크탑(768px 이상): Figma "데스크탑-세부메뉴(단체 관람 예약)" (node 231:1100)
 *     현재 위치 + 왼쪽 LNB + 가로형 입력카드 5개 + 가운데 제출 버튼
 * 현재 위치 + 제목 + 유의사항 + 입력메뉴 5개 + 제출 버튼
 * 문구는 현재 언어(useLanguage)에 따라 바뀜 — 팝업이 열린 채로 언어를 바꿔도 바로 바뀜
 * 동작 (실제 전송 없음 — CLAUDE.md 안전 규칙 6)
 *   - 날짜 칸: 날짜·시간 선택 팝업 (오늘부터 7일 뒤부터 선택 가능 — 유의사항 문구 기준)
 *   - 제출: 빠진 항목이 있으면 에러 팝업, 모두 맞으면 성공 팝업
 *   - 에러 팝업 버튼: 첫 번째 오류 항목으로 포커스 이동
 */
const MIN_VISITORS = 10; // 안내 문구 "단체 인원 10~30명" 기준 (사용자 결정 2026-11-09)
const MAX_VISITORS = 30;
const MIN_DAYS_AHEAD = 7;

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function GroupTourPage() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [visitDate, setVisitDate] = useState(null);
  const [organization, setOrganization] = useState('');
  const [visitors, setVisitors] = useState(MIN_VISITORS);
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [docent, setDocent] = useState('');

  const [pickerOpen, setPickerOpen] = useState(false);
  // 오류는 문구 키로 저장 (언어를 바꾸면 팝업 문구도 바뀜)
  const [errors, setErrors] = useState([]);
  const [booking, setBooking] = useState(null);

  // 오늘부터 7일 뒤 (화면이 처음 열릴 때 한 번 계산)
  const [minDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + MIN_DAYS_AHEAD);
    return date;
  });

  const validate = () => {
    const list = [];
    if (!visitDate) {
      list.push({ id: 'visit-date', field: 'Message_body_title1', message: 'Message_body_title1_body' });
    }
    if (!organization.trim()) {
      list.push({ id: 'organization', field: 'Message_body_title3', message: 'Message_body_title3_body' });
    }
    const count = Number.parseInt(visitors, 10);
    if (!count || count < MIN_VISITORS || count > MAX_VISITORS) {
      list.push({ id: 'visitors', field: 'Message_body_title4', message: 'Message_body_title4_body' });
    }
    if (!contactName.trim() || !isEmail(email)) {
      list.push({
        id: contactName.trim() ? 'contact-email' : 'contact-name',
        field: 'Message_body_title5',
        message: 'Message_body_title5_body',
      });
    }
    if (!docent) {
      list.push({ id: 'docent-english', field: 'Message_body_title6', message: 'Message_body_title6_body' });
    }
    return list;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const list = validate();
    if (list.length > 0) {
      setErrors(list);
      return;
    }
    setBooking({
      email: email.trim(),
      date: visitDate,
      count: Number.parseInt(visitors, 10),
      // 샘플 예약 번호 (실제 전송·발급 없음)
      number: `GT-${String(Date.now()).slice(-6)}`,
    });
  };

  // 에러 팝업 버튼: 팝업을 닫은 뒤 첫 번째 오류 항목으로 이동
  const goToFirstError = () => {
    const firstId = errors[0]?.id;
    setErrors([]);
    setTimeout(() => document.getElementById(firstId)?.focus(), 50);
  };

  return (
    <div className="group-tour-page">
      {/* 헤더-상단메뉴 */}
      <div className="page-top">
        <Breadcrumb
          label={t('breadcrumbLabel')}
          items={[
            { label: t('Address1'), href: withLang(lang) },
            { label: t('Address4'), href: withLang(lang, '/visitor-info/hours-admission') },
            { label: t('Address5') },
          ]}
        />
      </div>

      {/* 메인-사이드메뉴+프로그램 */}
      <div className="page-body">
        <div className="page-body__side">
          <DesktopSideMenu
            items={localizeMenu(lang === 'ko' ? menuKo : menuEn, lang)}
            currentId="group-tour"
            label={t('sectionMenuLabel')}
          />
        </div>

        <main className="group-tour-page__main">
          {/* 프로그램-상단메뉴 */}
          <div className="group-tour-page__top">
            <h1 className="group-tour-page__title">{t('Main_Title2')}</h1>
            <div className="group-tour-page__notice">
              <NoticeList items={[t('Menu_Caption1'), t('Menu_Caption2')]} />
            </div>
          </div>

          <form className="group-tour-page__form" onSubmit={handleSubmit} noValidate>
            {/* 입력메뉴1 */}
            <FormField label={t('Subtitle1')} required requiredText={t('required')} htmlFor="visit-date">
              <DateInput
                id="visit-date"
                placeholder={t('Subtitle1_body1')}
                value={visitDate ? formatFieldDate(visitDate, lang) : ''}
                onClick={() => setPickerOpen(true)}
              />
            </FormField>

            {/* 입력메뉴2 */}
            <FormField label={t('Subtitle2')} required requiredText={t('required')} htmlFor="organization">
              <TextInput
                id="organization"
                placeholder={t('Subtitle2_body1')}
                autoComplete="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </FormField>

            {/* 입력메뉴3 */}
            <FormField label={t('Subtitle3')} required requiredText={t('required')} htmlFor="visitors">
              {/* − / + 버튼으로 10~30명 조정 (숫자 직접 입력도 가능) */}
              <NumberStepper
                id="visitors"
                placeholder={t('Subtitle3_body1')}
                value={visitors}
                onChange={setVisitors}
                min={MIN_VISITORS}
                max={MAX_VISITORS}
                decreaseLabel={t('visitorsDecrease')}
                increaseLabel={t('visitorsIncrease')}
              />
            </FormField>

            {/* 입력메뉴4 */}
            <FormField label={t('Subtitle4')} required requiredText={t('required')} group>
              <TextInput
                id="contact-name"
                placeholder={t('Subtitle4_body1')}
                aria-label={t('Subtitle4_body1')}
                autoComplete="name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <TextInput
                id="contact-email"
                type="email"
                placeholder={t('Subtitle4_body2')}
                aria-label={t('Subtitle4_body2')}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            {/* 입력메뉴5 */}
            <FormField
              label={t('Subtitle5')}
              required
              requiredText={t('required')}
              group
              className="group-tour-page__docent"
            >
              <Checkbox
                id="docent-english"
                type="radio"
                name="docent"
                value="english"
                checked={docent === 'english'}
                onChange={() => setDocent('english')}
              >
                {t('Subtitle5_body1')}
              </Checkbox>
              <Checkbox
                type="radio"
                name="docent"
                value="none"
                checked={docent === 'none'}
                onChange={() => setDocent('none')}
              >
                {t('Subtitle5_body2')}
              </Checkbox>
            </FormField>

            {/* 버튼 */}
            <div className="group-tour-page__actions">
              <Button
                type="submit"
                size="large"
                selected
                aria-pressed={undefined}
                className="group-tour-page__submit"
              >
                {t('Subtitle_button')}
              </Button>
            </div>
          </form>
        </main>
      </div>

      {/* 방문일자 & 시간 선택입력 팝업창 */}
      <Modal open={pickerOpen} onClose={() => setPickerOpen(false)} labelledBy="picker-title">
        <DateTimePickerPopup
          titleId="picker-title"
          defaultValue={visitDate ?? undefined}
          minDate={minDate}
          locale={LOCALES[lang]}
          labels={{
            title: t('Message_title3'),
            time: t('Message_body_title8'),
            cancel: t('Message_button6'),
            ok: t('Message_button7'),
            prevMonth: t('prevMonth'),
            nextMonth: t('nextMonth'),
            noDate: t('noDate'),
          }}
          onConfirm={(date) => {
            setVisitDate(date);
            setPickerOpen(false);
          }}
          onCancel={() => setPickerOpen(false)}
        />
      </Modal>

      {/* 에러메시지 팝업창 */}
      <Modal open={errors.length > 0} onClose={() => setErrors([])} labelledBy="error-title" role="alertdialog">
        <ErrorMessagePopup
          titleId="error-title"
          title={t('Message_title2')}
          message={t('Message_title2_body1')}
          errors={errors.map((error) => ({ field: t(error.field), message: t(error.message) }))}
          buttonLabel={t('Message_button3')}
          onConfirm={goToFirstError}
        />
      </Modal>

      {/* 예약 성공 메시지 팝업창 */}
      <Modal open={Boolean(booking)} onClose={() => setBooking(null)} labelledBy="booking-title">
        {booking && (
          <BookingSuccessPopup
            titleId="booking-title"
            title={t('Message_title1')}
            message={t('Message_title1_ex1', { email: booking.email })}
            details={[
              { label: t('Message_title1_body1-1'), value: formatSummaryDate(booking.date, lang) },
              { label: t('Message_title1_body2-1'), value: t('visitorsCount', { n: booking.count }) },
              { label: t('Message_title1_body3-1'), value: booking.number },
            ]}
            notice={t('Message_body1')}
            primaryLabel={t('Message_button1')}
            secondaryLabel={t('Message_button2')}
            onPrimary={() => {
              setBooking(null);
              navigate(withLang(lang));
            }}
            onSecondary={() => setBooking(null)}
          />
        )}
      </Modal>
    </div>
  );
}
