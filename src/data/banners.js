/**
 * 메인 배너 데이터 — 자동 슬라이드 3개 (순서는 실제 사이트 suma.suwon.go.kr 메인과 같음)
 * 문구는 Figma 문구 변수 "Text(Language)" 기준 (bannersEn: 영어 모드, bannersKo: 한국어 모드)
 * 단, expansion-pack은 Figma에 없어 실제 사이트 배너 이미지의 국·영문 표기를 옮김
 *
 * 항목
 *   id        고유 값 (두 언어 공통)
 *   title     배너 제목
 *   info      설명 줄 목록 (기간, 장소)
 *   imageSrc  이미지 (assets/images)
 *   imageSrcDesktop  데스크탑용 가로형 이미지 (실제 사이트 데스크탑 배너, 없으면 imageSrc)
 *   imageAlt  대체 텍스트. 포스터 내용이 제목과 겹치므로 ''(꾸밈용)
 */
import image02 from '../assets/images/image-02.jpg';
import image01Wide from '../assets/images/image-01-wide.gif';
import image02Wide from '../assets/images/image-02-wide.jpg';
import image09 from '../assets/images/image-09-s.jpg';

export const bannersEn = [
  {
    id: 'expansion-pack',
    title: 'Expansion Pack: Artistic Research',
    info: ['Date: 2026.08.28 - 2026.12.20', 'Suwon Art Space Gwanggyo'],
    imageSrc: image09,
    imageAlt: '',
  },
  {
    id: 'green-green-museum',
    title: 'Green Green Museum : Sensory Notes',
    info: ['Date: 2026.08.11 - 2026.12.04', 'Suwon Manseok Gallery'],
    imageSrc: image01Wide, // 모바일도 데스크탑과 같은 움직이는 배너 (사용자 결정 2026-11-09)
    imageAlt: '',
  },
  {
    id: 'blanc-black-panorama',
    title: '2026 SUMA Collection Exhibition: Blanc Black Panorama',
    info: ['Date: 2026.02.12 - 2027.03.01', 'Suwon Museum of Art'],
    imageSrc: image02,
    imageSrcDesktop: image02Wide,
    imageAlt: '',
  },
];

export const bannersKo = [
  {
    id: 'expansion-pack',
    title: '확장팩: 아티스틱 리서치',
    info: ['기간: 2026.08.28 - 2026.12.20', '수원아트스페이스광교'],
    imageSrc: image09,
    imageAlt: '',
  },
  {
    id: 'green-green-museum',
    title: '그린 그린 뮤지엄 : 센서리 노트',
    info: ['기간: 2026.08.11 - 2026.12.04', '수원만석전시관'],
    imageSrc: image01Wide, // 모바일도 데스크탑과 같은 움직이는 배너 (사용자 결정 2026-11-09)
    imageAlt: '',
  },
  {
    id: 'blanc-black-panorama',
    title: '2026 SUMA 소장품전: 블랑 블랙 파노라마',
    info: ['기간: 2026.02.12 - 2027.03.01', '수원시립미술관'],
    imageSrc: image02,
    imageSrcDesktop: image02Wide,
    imageAlt: '',
  },
];
