/**
 * 메인 배너 데이터 — Figma "모바일-메인" 배너 2개
 * 문구는 Figma 문구 변수 "Text(Language)" 기준 (bannersEn: 영어 모드, bannersKo: 한국어 모드)
 *
 * 항목
 *   id        고유 값 (두 언어 공통)
 *   title     배너 제목
 *   info      설명 줄 목록 (기간, 장소)
 *   imageSrc  이미지 (assets/images)
 *   imageAlt  대체 텍스트. 포스터 내용이 제목과 겹치므로 ''(꾸밈용)
 */
import image01 from '../assets/images/image-01.jpg';
import image02 from '../assets/images/image-02.jpg';

export const bannersEn = [
  {
    id: 'green-green-museum',
    title: 'Green Green Museum : Sensory Notes',
    info: ['Date: 2026.08.11 - 2026.12.04', 'Suwon Manseok Gallery'],
    imageSrc: image01,
    imageAlt: '',
  },
  {
    id: 'blanc-black-panorama',
    title: '2026 SUMA Collection Exhibition: Blanc Black Panorama',
    info: ['Date: 2026.02.12 - 2027.03.01', 'Suwon Museum of Art'],
    imageSrc: image02,
    imageAlt: '',
  },
];

export const bannersKo = [
  {
    id: 'green-green-museum',
    title: '그린 그린 뮤지엄 : 센서리 노트',
    info: ['기간: 2026.08.11 - 2026.12.04', '수원만석전시관'],
    imageSrc: image01,
    imageAlt: '',
  },
  {
    id: 'blanc-black-panorama',
    title: '2026 SUMA 소장품전: 블랑 블랙 파노라마',
    info: ['기간: 2026.02.12 - 2027.03.01', '수원시립미술관'],
    imageSrc: image02,
    imageAlt: '',
  },
];
