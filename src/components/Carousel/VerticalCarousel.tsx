'use client';

import { FC, JSX, use, useCallback, useEffect, useRef, useState } from 'react';
// import './Vertical.css';

interface ICarouselProps {
  slides: { key: number; content: string }[];
  offsetRadius: number;
  showNavigation: boolean;
}

const VerticalCarousel: FC<ICarouselProps> = ({ ...props }): JSX.Element => {
  const [index, setIndex] = useState(0);
  const mod = (a: number, b: number): number => {
    return ((a % b) + b) % b;
  };
  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowUp':
        moveSlide(1);
        break;
      case 'ArrowDown':
        moveSlide(-1);
        break;
      default:
        return;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const modBySlidesLength = (index: number) => {
    return mod(index, props.slides.length);
  };

  const moveSlide = (dir: number) => {
    console.log('Moving slide in direction:', dir > 0 ? 'down' : 'up');
    setIndex((prevIndex) => modBySlidesLength(prevIndex + dir));
  };

  const clampOffsetRadius = (offsetRadius: number) => {
    const { slides } = props;
    const upperBound = Math.floor((slides.length - 1) / 2);
    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }
    return offsetRadius;
  };

  const getPresentableSlides = () => {
    const { slides } = props;
    let { offsetRadius } = props;
    offsetRadius = clampOffsetRadius(offsetRadius);
    const presentableSlides = new Array();

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)]);
    }
    console.log('Presentable slides:', presentableSlides);
    return presentableSlides;
  };

  return (
    <div className="fixed flex flex-col justify-center w-screen h-screen mx-auto my-0 bg-amber-400">
      {getPresentableSlides().map(
        (slide: { key: number; content: string }, idx: number): JSX.Element => (
          <div key={slide.key}>
            {slide.content} | {index}
          </div>
        )
      )}
    </div>
  );
};

export default VerticalCarousel;

// https://jsfiddle.net/21fx6ge7/
