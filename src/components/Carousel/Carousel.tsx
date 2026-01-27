'use client';
import { useState, useEffect, useRef, JSX, Fragment } from 'react';
import Image from 'next/image';
// import { CarouselProps } from './Carousel.types';
import { Icon } from '../Icon';
import './Carousel.css';
import { dir } from 'console';

const placeholderImages = [
  'https://images.unsplash.com/photo-1523815378073-a43ae3fbf36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80',
  'https://images.unsplash.com/photo-1512203492609-972c16baa28b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  'https://images.unsplash.com/photo-1487803836022-91054ca05fdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  'https://images.unsplash.com/photo-1530143584546-02191bc84eb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
];

export default function Carousel({ ...props }: any): JSX.Element {
  const { autoPlay, speed } = props.properties;
  const [index, setIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLUListElement>(null);
  const slides = useRef<Array<HTMLLIElement>>([]);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);
  const controllerRef = useRef(new AbortController());
  const pause = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (!carousel.current || !slider.current) return;
    slider.current!.prepend(slides.current[slides.current.length - 1]);
    if (autoPlay) {
      startInterval(speed);
      carousel.current!.addEventListener('mouseenter', () =>
        clearInterval(intervalId.current)
      );
      carousel.current!.addEventListener('mouseleave', () =>
        startInterval(speed)
      );
    }
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
      controllerRef.current.abort();
    };
  }, [slides.current]);

  const handleClick = (dir: number): void => {
    slides.current[index].classList.remove('selected');
    if (dir === -1) {
      setIndex((pIndex) =>
        pIndex === 0 ? slides.current.length - 1 : pIndex - 1
      );
      slides.current[index].classList.add('selected');
      slider.current!.prepend(slider.current!.lastElementChild!);
    }
    if (dir === 1) {
      setIndex((pIndex) =>
        pIndex === slides.current.length - 1 ? 0 : pIndex + 1
      );
      slides.current[index].classList.add('selected');
      slider.current!.append(slider.current!.firstElementChild!);
    }
  };

  const handleDotClick = async (idx: number): Promise<void> => {
    const count = idx < index ? index - idx : idx - index;
    for (let i = count; i > 0; i--) {
      idx < index ? prevBtn.current!.click() : nextBtn.current!.click();
      await pause(500);
    }
  };

  const startInterval = (ms: number): void => {
    if (intervalId.current !== undefined) intervalId.current = undefined;
    intervalId.current = setInterval(() => nextBtn.current!.click(), ms);
  };

  return (
    <>
      <main className="main">
        <div
          className="carousel"
          ref={carousel}>
          <div className="carousel_track-container">
            <ul
              ref={slider}
              className="carousel_track">
              {placeholderImages.map((src, idx) => (
                <Fragment key={idx}>
                  <li
                    className={`carousel_slide ${
                      idx === index ? 'selected' : ''
                    }`}
                    ref={(el) => {
                      if (el) slides.current[idx] = el;
                    }}>
                    <div className="carousel_image -z-10">
                      <img
                        src={src}
                        alt=""
                        role="presentation"
                      />
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
            {placeholderImages.map((src, idx) => (
              <Fragment key={idx}>
                <button
                  disabled={idx === index}
                  onClick={() => handleDotClick(idx)}
                  key={idx}
                  type="button"
                  className={`disabled:cursor-none w-5 h-5 rounded-full transition-colors duration-200 ${
                    idx === index ? 'bg-[#1bb9ed]' : 'bg-gray-200'
                  }`}
                  aria-label={`Slide number ${idx + 1}`}
                />
              </Fragment>
            ))}
          </div>
          <button
            ref={prevBtn}
            onClick={() => handleClick(-1)}
            type="button"
            className="cursor-pointer z-10 absolute top-1/2 -translate-y-1/2 left-10 hover:bg-[#1bb9ed] hover:border-[#1bb9ed] rounded-full border-2 border-white text-white"
            aria-label="Previous slide">
            <Icon
              name="chevronLeft"
              size="xl"
            />
          </button>
          <button
            ref={nextBtn}
            onClick={() => handleClick(1)}
            type="button"
            className="cursor-pointer z-10 absolute top-1/2 -translate-y-1/2 right-10 hover:bg-[#1bb9ed] hover:border-[#1bb9ed] rounded-full border-2 border-white text-white"
            aria-label="Next slide">
            <Icon
              name="chevronRight"
              size="xl"
            />
          </button>
        </div>
      </main>
    </>
  );
}

// https://codepen.io/frontendmax/pen/abbBzpq
