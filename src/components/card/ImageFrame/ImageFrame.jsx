import './ImageFrame.css';

/**
 * ImageFrame — Figma "이미지모음" (node 879:5538, 안쪽 틀 "이미지변경")
 * 테두리 + 그림자가 있는 이미지 틀. 기본 비율은 328:184
 * 이미지가 없으면 테두리만 있는 빈 틀로 보임 (Figma 배너·카드 기본 모양)
 *
 * @param {string} src  이미지 주소 (예: import한 jpg/png)
 * @param {string} alt  대체 텍스트. 꾸밈용이면 빈 문자열('')
 */
export default function ImageFrame({ src, alt = '', className = '' }) {
  return (
    <div className={['image-frame', className].filter(Boolean).join(' ')}>
      {src && <img src={src} alt={alt} className="image-frame__image" />}
    </div>
  );
}
