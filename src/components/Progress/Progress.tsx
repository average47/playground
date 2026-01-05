'use client';
import { useState, useEffect, useRef, type JSX } from 'react';
import type { IProgressProps } from './Progress.types';
import styles from './Progress.module.css';

export default function Progress({ ...props }: IProgressProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [count, setCount] = useState(0);
  const handleOnChange = (val: number) => {
    const container = containerRef.current;
    const circle = circleRef.current;
    if (!container || !circle) {
      return;
    }
    const value = (): number => {
      return val < 0 ? 0 : val > 100 ? 100 : val;
    };
    const r = parseInt(circle.getAttribute('r') ?? '90');
    const c = Math.PI * (r * 2);
    const p = (((100 - value()) / 100) * c).toString();
    circle.style.strokeDashoffset = p;
    container.setAttribute('data-pct', value().toString());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (count === props.length) {
        clearInterval(interval);
        return;
      }
      setCount((prevCount) => prevCount + 1);
      handleOnChange(((count + 2) / props.length) * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="block relative -rotate-90"
      data-pct="0">
      <svg
        className="tran"
        width={props.size.toString()}
        height={props.size.toString()}
        viewBox="0 0 200 200"
        version="1.1">
        <circle
          className={`${styles.circle} stroke-[2em]`}
          r="90"
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray="565.48"
          strokeDashoffset="0"></circle>
        <circle
          style={{
            stroke: props.strokeColor ?? 'currentColor',
            strokeDashoffset: '565.487',
          }}
          ref={circleRef}
          className={`${styles.circle} stroke-[2em]`}
          r="90"
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray="565.48"
          strokeDashoffset="565.48"></circle>
      </svg>
    </div>
  );
}
