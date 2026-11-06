/**
 * 프로그램 샘플 데이터 — Figma "메인-정보카드" (node 879:5439) 카드 6장
 * 문구는 Figma 문구 변수 "Text(Language)" 기준 (programsEn: 영어 모드, programsKo: 한국어 모드)
 * MainInfoCards의 items로 사용. 두 언어의 id·순서는 같게 유지
 *
 * 항목
 *   id            고유 값
 *   type          대상: 'Child' | 'Adult' | 'Family' (필터·ExhibitionType에 사용)
 *   typeLabel     태그 글자 (국문용. 없으면 영문 기본 글자)
 *   title         제목
 *   info          설명 줄 목록
 *   imageSrc      이미지
 *   imageAlt      이미지 대체 텍스트. 포스터 내용이 카드 제목과 겹치므로 샘플은 ''(꾸밈용)
 *                 실제 데이터에서 포스터에만 있는 정보가 있으면 설명을 넣으세요
 *   buttonLabel   버튼 글자 (기본 'Apply')
 *   buttonVariant 버튼 모양: 'filled' | 'outlined'
 */
import image03 from '../assets/images/image-03.png';
import image04 from '../assets/images/image-04.png';
import image05 from '../assets/images/image-05.png';
import image06 from '../assets/images/image-06.png';
import image07 from '../assets/images/image-07.png';
import image08 from '../assets/images/image-08.png';

export const programsEn = [
  {
    id: 'green-museum-tour-nov',
    type: 'Child',
    title:
      '<Green Green Museum Part 2: Sensory Notes> Guided Exhibition Tour for Children’s Groups (November)',
    info: ['Date: 2026.11.03 - 2026.11.27', 'Suwon Manseok Gallery'],
    imageSrc: image03,
    imageAlt: '',
  },
  {
    id: 'shared-school-adults',
    type: 'Adult',
    title: '2026 Gyeonggi Shared School <SUMA X Museum People 2>: Curator & Exhibition Designer',
    info: ['Date: 2026.10.24 - 2026.11.14', 'Suwon Museum of Art'],
    imageSrc: image04,
    imageAlt: '',
    buttonLabel: 'Guide',
    buttonVariant: 'outlined',
  },
  {
    id: 'lab-of-chance',
    type: 'Family',
    title: 'Lab of Chance: Bending, Spreading, Wriggling',
    info: ['Date: 2026.10.20 - 2026.11.05', 'Suwon Art Space Gwanggyo'],
    imageSrc: image05,
    imageAlt: '',
  },
  {
    id: 'traveling-museum',
    type: 'Child',
    title: '2026 Second-Half Participatory Workshop for Children & Youth <Traveling Museum>',
    info: ['Date: 2026.09.03 - 2026.11.20', 'Suwon Manseok Gallery'],
    imageSrc: image06,
    imageAlt: '',
  },
  {
    id: 'museum-picnic',
    type: 'Family',
    title: '《Green Green Museum Part 2: Sensory Notes》 Special Workshop <Museum Picnic>',
    info: ['Date: 2026.09.01 - 2026.11.27', 'Suwon Manseok Gallery'],
    imageSrc: image08,
    imageAlt: '',
  },
  {
    id: 'manseok-park',
    type: 'Child',
    title:
      'Ongoing Education Linked with Manseok Park <Manseok Deulsseok Park Exploration> for Children’s Institutional Groups (October)',
    info: ['Date: 2026.10.01 - 2026.10.31', 'Suwon Manseok Gallery'],
    imageSrc: image07,
    imageAlt: '',
  },
];

export const programsKo = [
  {
    id: 'green-museum-tour-nov',
    type: 'Child',
    typeLabel: '어린이',
    title: '<그린 그린 뮤지엄 2부: 감각 노트> 어린이 단체 전시해설 프로그램 (11월)',
    info: ['기간: 2026.11.03 - 2026.11.27', '수원만석전시관'],
    imageSrc: image03,
    imageAlt: '',
    buttonLabel: '신청하기',
  },
  {
    id: 'shared-school-adults',
    type: 'Adult',
    typeLabel: '성인',
    title: '2026 경기공유학교 <SUMA X 미술관사람들2> : 큐레이터 & 전시디자이너',
    info: ['기간: 2026.10.24 - 2026.11.14', '수원시립미술관'],
    imageSrc: image04,
    imageAlt: '',
    buttonLabel: '안내',
    buttonVariant: 'outlined',
  },
  {
    id: 'lab-of-chance',
    type: 'Family',
    typeLabel: '가족',
    title: '우연한 연구소: 휘고, 번지고, 꿈틀대고',
    info: ['기간: 2026.10.20 - 2026.11.05', '수원아트스페이스광교'],
    imageSrc: image05,
    imageAlt: '',
    buttonLabel: '신청하기',
  },
  {
    id: 'traveling-museum',
    type: 'Child',
    typeLabel: '어린이',
    title: '2026 하반기 어린이ㆍ청소년 대상 참여 워크숍 <찾아가는 미술관>',
    info: ['기간: 2026.09.03 - 2026.11.20', '수원만석전시관'],
    imageSrc: image06,
    imageAlt: '',
    buttonLabel: '신청하기',
  },
  {
    id: 'museum-picnic',
    type: 'Family',
    typeLabel: '가족',
    title: '《그린그린 뮤지엄 2부: 감각 노트》특별 워크숍 <미술관 소풍>',
    info: ['기간: 2026.09.01 - 2026.11.27', '수원만석전시관'],
    imageSrc: image08,
    imageAlt: '',
    buttonLabel: '신청하기',
  },
  {
    id: 'manseok-park',
    type: 'Child',
    typeLabel: '어린이',
    title: '만석공원 연계 상시교육 <만석들썩 공원탐구> 어린이 기관 단체 (10월)',
    info: ['기간: 2026.10.01 - 2026.10.31', '수원만석전시관'],
    imageSrc: image07,
    imageAlt: '',
    buttonLabel: '신청하기',
  },
];
