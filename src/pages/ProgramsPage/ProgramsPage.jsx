import Breadcrumb from '../../components/navigation/Breadcrumb/Breadcrumb';
import DesktopSideMenu from '../../components/navigation/DesktopSideMenu/DesktopSideMenu';
import MainInfoCards from '../../components/card/MainInfoCards/MainInfoCards';
import { menuEn, menuKo } from '../../data/menu';
import { programsEn, programsKo } from '../../data/programs';
import useLanguage from '../../i18n/useLanguage';
import { linkWithLang, localizeMenu } from '../../i18n/paths';
import '../PageTop.css';

/**
 * ProgramsPage — 교육 프로그램 목록
 *   모바일: Figma "모바일-세부메뉴(교육 & 문화프로그램)" (node 264:9860)
 *   데스크탑(768px 이상): Figma "데스크탑-세부메뉴(프로그램 및 워크숍)" (node 231:1044)
 *     현재 위치 + 왼쪽 LNB(메인메뉴_사이드) + 메인-정보카드(3열)
 * 문구는 현재 언어(useLanguage)에 따라 바뀜
 *
 * @param {function} onApply  카드 버튼을 눌렀을 때 (item)을 받음
 */
const CURRENT_ID = 'programs-workshops';

export default function ProgramsPage({ onApply }) {
  const { lang, t } = useLanguage();
  const isKo = lang === 'ko';

  return (
    <div className="programs-page">
      {/* 헤더-상단메뉴 / 헤더-선택메뉴 현재위치 */}
      <div className="page-top">
        <Breadcrumb
          label={t('breadcrumbLabel')}
          items={[
            { label: t('Address1'), href: linkWithLang(lang) },
            { label: t('Address2'), href: linkWithLang(lang, '/education/programs-workshops') },
            { label: t('Address3') },
          ]}
        />
      </div>

      {/* 메인-사이드메뉴+프로그램 */}
      <div className="page-body">
        <div className="page-body__side">
          <DesktopSideMenu
            items={localizeMenu(isKo ? menuKo : menuEn, lang)}
            currentId={CURRENT_ID}
            label={t('sectionMenuLabel')}
          />
        </div>
        <main>
          <MainInfoCards
            title={t('Main_Title1')}
            items={isKo ? programsKo : programsEn}
            onApply={onApply}
            filterLabels={{
              All: t('Main_Button1'),
              Child: t('Main_Button2'),
              Adult: t('Main_Button3'),
              Family: t('Main_Button4'),
            }}
            groupLabel={t('filterLabel')}
            emptyText={t('noPrograms')}
          />
        </main>
      </div>
    </div>
  );
}
