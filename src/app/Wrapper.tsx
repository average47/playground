'use client';

import { useEffect, useLayoutEffect, useRef, useState, JSX } from 'react';
import { Carousel, List } from '@/components';

export default function Wrapper({ ...data }: any): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const windowSizeHandler = () => {
    setHeight(wrapperRef.current ? wrapperRef.current.clientHeight : 0);
  };
  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    setHeight(wrapperRef.current.clientHeight);
  }, [height]);
  useEffect(() => {
    window.addEventListener('resize', windowSizeHandler);
    return () => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, [height]);
  return (
    <div
      className="w-screen h-auto bg-amber-200 grid grid-cols-5 gap-2 overflow-hidden"
      ref={wrapperRef}>
      <div className="col-start-1 col-end-5 bg-amber-400 aspect-video">
        <Carousel
          {...data}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <div className="col-start-5 col-end-6 bg-amber-800 h-full">
        <List
          {...data}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          height={height}
        />
      </div>
    </div>
  );
}
