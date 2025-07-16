'use client';
import { type FC, use, useEffect, useRef } from 'react';
import type { IProgressProps } from './Progress.types';
import styles from './Progress.module.css';

const Progress: FC<IProgressProps> = ({ ...props }) => {
  console.log('Progress props', props);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const container = containerRef.current;
    const circle = circleRef.current;
    if (!container || !circle) {
      return;
    }
    const value = (): number => {
      const inputValue = parseInt(e.target.value);
      return inputValue < 0 ? 0 : inputValue > 100 ? 100 : inputValue;
    };

    const r = parseInt(circle.getAttribute('r') ?? '90');
    const c = Math.PI * (r * 2);
    const p = (((100 - value()) / 100) * c).toString();
    circle.style.strokeDashoffset = p;
    container.setAttribute('data-pct', value.toString());
  };

  return (
    <>
      <div
        ref={containerRef}
        className="block h-[200px] w-[200px] m-auto rounded-full relative"
        data-pct="100">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          version="1.1">
          <circle
            className={styles.circle}
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray="565.48"
            strokeDashoffset="0"></circle>
          <circle
            style={{
              stroke: props.strokeColor ?? 'currentColor',
              strokeWidth: props.strokeWidth ?? '1em',
            }}
            ref={circleRef}
            className={styles.circle}
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray="565.48"
            strokeDashoffset="0"></circle>
        </svg>
      </div>
      <input
        onChange={handleOnChange}
        name="percent"></input>
    </>
  );
};

// const Progress: FC<SVGElement> = ({ children, ...props }) => {
//   const baseTimerLabel = useRef<HTMLSpanElement>(null);
//   const baseTimerPathRemaining = useRef<SVGPathElement>(null);
//   const FULL_DASH_ARRAY = 283;

//   const TIME_LIMIT = 20;
//   let timePassed = 0;
//   let timeLeft = TIME_LIMIT;
//   let timerInterval = null as unknown as NodeJS.Timeout;

//   const onTimesUp = () => {
//     clearInterval(timerInterval);
//   };

//   const startTimer = () => {
//     timerInterval = setInterval(() => {
//       timePassed = timePassed += 1;
//       timeLeft = TIME_LIMIT - timePassed;
//       if (baseTimerLabel.current) {
//         baseTimerLabel.current.innerHTML = formatTime(timeLeft);
//       }
//       setCircleDasharray();
//       if (timeLeft === 0) {
//         onTimesUp();
//       }
//     }, 1000);
//   };

//   const formatTime = (time: number): string => {
//     const minutes = Math.floor(time / 60);
//     let seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   const calculateTimeFraction = () => {
//     const rawTimeFraction = timeLeft / TIME_LIMIT;
//     return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
//   };

//   const setCircleDasharray = () => {
//     const circleDasharray = `${(
//       calculateTimeFraction() * FULL_DASH_ARRAY
//     ).toFixed(0)} 283`;
//     baseTimerPathRemaining.current?.setAttribute(
//       'stroke-dasharray',
//       circleDasharray
//     );
//   };

//   useEffect(() => {
//     startTimer();
//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, []);

//   return (
//     <div className={styles.baseTimer}>
//       <svg
//         className={styles.svg}
//         viewBox="0 0 100 100">
//         <g className={styles.circle}>
//           <circle
//             className={styles.pathElapsed}
//             cx="50"
//             cy="50"
//             r="45"></circle>
//           <path
//             ref={baseTimerPathRemaining}
//             strokeDasharray="283"
//             className={styles.pathRemaining}
//             d="
//            M 50, 50
//            m -45, 0
//            a 45,45 0 1,0 90,0
//            a 45,45 0 1,0 -90,0
//          "></path>
//         </g>
//       </svg>
//       <span
//         ref={baseTimerLabel}
//         className={styles.label}>
//         {formatTime(timeLeft)}
//       </span>
//     </div>
//   );
// };

export default Progress;
