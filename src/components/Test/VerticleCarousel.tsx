'use client';
import { FC, JSX, Fragment, useState } from 'react';
import Slide from './Slide';

const VerticalCarousel: FC<any> = ({ ...props }): JSX.Element => {
  const [index, setIndex] = useState(0);
  const { slides, offsetRadius, showNavigation } = props;
  let navigationButtons = null;

  if (showNavigation) {
    navigationButtons = (
      <div className="relative flex h-16 my-0 mx-auto w-1/5 mt-4 justify-between z-10">
        <button
          className="bg-white p-2 rounded"
          onClick={() => moveSlide(-1)}>
          &#8593;
        </button>
        <button
          className="bg-white p-2 rounded"
          onClick={() => moveSlide(1)}>
          &#8595;
        </button>
      </div>
    );
  }
  const mod = (a: number, b: number) => {
    return ((a % b) + b) % b;
  };

  const modBySlidesLength = (index: number): number => {
    return mod(index, props.slides.length);
  };

  const moveSlide = (direction: number): void => {
    console.log('Move slide in direction:', direction < 0 ? 'up' : 'down');
    // Implement the logic for moving the slide here
  };

  const clampOffsetRadius = (offsetRadius: number): number => {
    const { slides } = props;
    const upperBound = Math.floor((slides.length - 1) / 2);
    if (offsetRadius < 0) return 0;
    if (offsetRadius > upperBound) return upperBound;
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

    return presentableSlides;
  };

  return (
    <Fragment>
      <div className="relative flex justify-center w-full h-full">
        {getPresentableSlides().map((slide, idx) => (
          <Slide
            key={idx}
            content={slide}
            moveSlide={moveSlide}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={idx}
          />
        ))}
      </div>
      {navigationButtons}
    </Fragment>
  );
};

export default VerticalCarousel;
