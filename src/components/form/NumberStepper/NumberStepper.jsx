import TextInput from '../TextInput/TextInput';
import './NumberStepper.css';

/**
 * NumberStepper — 숫자 조정 입력칸 (− 숫자 +)
 *   − / + 버튼으로 1씩 조정, 숫자를 직접 입력할 수도 있음
 *   입력을 마치면(포커스가 나가면) min~max 범위로 맞춤
 *   (Figma 시안 없음 — 기존 TextInput과 같은 모양으로 구성)
 *
 * @param {string} id            숫자 칸 id (FormField의 htmlFor와 같은 값)
 * @param {number|string} value  현재 값 (입력 중에는 빈 문자열일 수 있음)
 * @param {function} onChange    바뀐 값을 받음 (숫자 또는 입력 중인 문자열)
 * @param {number} min           최솟값
 * @param {number} max           최댓값
 * @param {string} decreaseLabel − 버튼 이름 (화면낭독기용, 예: "인원 줄이기")
 * @param {string} increaseLabel + 버튼 이름 (화면낭독기용, 예: "인원 늘리기")
 */
export default function NumberStepper({
  id,
  value,
  onChange,
  min = 0,
  max = Infinity,
  decreaseLabel = 'Decrease',
  increaseLabel = 'Increase',
  className = '',
  ...rest
}) {
  const number = Number.parseInt(value, 10);
  const current = Number.isNaN(number) ? min : number;
  const clamp = (n) => Math.min(Math.max(n, min), max);

  return (
    <div className={['number-stepper', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="number-stepper__button"
        aria-label={decreaseLabel}
        aria-controls={id}
        disabled={current <= min}
        onClick={() => onChange(clamp(current - 1))}
      >
        −
      </button>

      <TextInput
        id={id}
        className="number-stepper__input"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, 3))}
        onBlur={() => onChange(clamp(current))}
        {...rest}
      />

      <button
        type="button"
        className="number-stepper__button"
        aria-label={increaseLabel}
        aria-controls={id}
        disabled={current >= max}
        onClick={() => onChange(clamp(current + 1))}
      >
        +
      </button>
    </div>
  );
}
