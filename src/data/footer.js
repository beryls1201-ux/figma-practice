/**
 * 푸터 데이터 — 실제 수원시립미술관 사이트(suma.suwon.go.kr) 하단 기준
 * 화면 글자는 여기 두지 않고 labelKey(문구 키)만 둠 → App.jsx에서 t(labelKey)로 바꿔 넣음
 *
 * policyLinks  정책 링크 (disabled: true면 흐린 글자, 이동하지 않음)
 * snsLinks     SNS 링크 (새 창으로 열림, 아이콘은 src/assets/images/footer-icon-0N.png)
 */
import instagramIcon from '../assets/images/footer-icon-01.png';
import facebookIcon from '../assets/images/footer-icon-02.png';
import youtubeIcon from '../assets/images/footer-icon-03.png';
import blogIcon from '../assets/images/footer-icon-04.png';
import kakaoIcon from '../assets/images/footer-icon-05.png';

export const policyLinks = [
  // 수원시청 사이트의 개인정보처리방침 페이지 (실제 사이트와 같음)
  {
    id: 'privacy',
    labelKey: 'footerPrivacy',
    href: 'https://www.suwon.go.kr/sw-www/sw-www_09/sw-www_09_01.jsp',
  },
  // 약관 원문 화면은 아직 없음 → 비활성
  { id: 'terms', labelKey: 'footerTerms', disabled: true },
  { id: 'email-refusal', labelKey: 'footerEmailRefusal', disabled: true },
];

export const snsLinks = [
  { id: 'instagram', labelKey: 'snsInstagram', href: 'https://instagram.com/suwon.museum.of.art', iconSrc: instagramIcon },
  { id: 'facebook', labelKey: 'snsFacebook', href: 'https://www.facebook.com/suwon.museum.of.art', iconSrc: facebookIcon },
  { id: 'youtube', labelKey: 'snsYoutube', href: 'https://www.youtube.com/channel/UCKF9KQeCuhLTtl0k8d1v3Eg', iconSrc: youtubeIcon },
  { id: 'blog', labelKey: 'snsBlog', href: 'https://blog.naver.com/suwon_museum', iconSrc: blogIcon },
  { id: 'kakao', labelKey: 'snsKakao', href: 'https://pf.kakao.com/_tAzss', iconSrc: kakaoIcon },
];

// 전화번호 (화면 표시는 문구 footerTel, 누르면 전화 걸기)
export const telHref = 'tel:031-5191-3800';
