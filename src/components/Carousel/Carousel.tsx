'use client';
import {
  JSX,
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
  use,
} from 'react';
import './Carousel.css';
export default function Carousel({ ...props }: any): JSX.Element {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const animation = props.properties.animationSpeed || 500;
  const visibleSlides = props.properties.visibleSlides || 1;

  const moveDistance = 100 / visibleSlides;
  const total = props.children.length as number;

  // ------------ KEEPED ------------------------------------------------------

  // DOM utility functions:

  const el = (sel: string, par?: ParentNode) =>
    (par || document).querySelector(sel);
  const els = (sel: string, par?: ParentNode) =>
    (par || document).querySelectorAll(sel);
  const elNew = (tag: string, prop: any) =>
    Object.assign(document.createElement(tag), prop);

  // Task: Carousel:

  const anim = useCallback(
    (ms = animation) => {
      if (!sliderRef.current || !slidesRef.current) return;
      const sliderEl = sliderRef.current;
      const slidesEls = slidesRef.current;
      if (current === 0) {
        sliderEl.append(sliderEl.lastElementChild!);
      } else if (current === total - 1) {
        sliderEl.prepend(sliderEl.firstElementChild!);
      }

      // for (let i = 0; i < visibleSlides; i++) {
      //   sliderEl.prepend(slidesEls[total - 1 - i].cloneNode(true));
      //   sliderEl.append(slidesEls[i].cloneNode(true));
      // }

      sliderEl.style.transitionDuration = `${ms}ms`;
      sliderEl.style.transform = `translateX(calc(${
        (-current - visibleSlides) * moveDistance
      }%))`;
    },
    [current, animation, moveDistance, visibleSlides]
  );
  const infinite = useCallback(() => {
    if (!sliderRef.current || !slidesRef.current) return;
    const sliderEl = sliderRef.current;
    const slidesEls = slidesRef.current;
  }, [current]);

  const handleTransitionEnd = useCallback(() => {
    if (current <= -1) setCurrent(total - 1);
    if (current >= total) setCurrent(0);
    anim(0);
  }, [current, total, anim]);

  useEffect(() => {
    if (!sliderRef.current) return;
    const sliderEl = sliderRef.current;
    sliderEl.addEventListener('transitionend', handleTransitionEnd);
    anim(0);
    return () => {
      sliderEl.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [current]);
  return (
    <>
      <div
        ref={carouselRef}
        className="carousel"
        style={
          {
            '--visible-slides': props.properties.visibleSlides,
          } as React.CSSProperties
        }>
        <div
          className="carousel-slider"
          ref={sliderRef}>
          {Array.from({ length: props.children.length }, (_, index) => (
            <Fragment key={index}>
              <div
                className="carousel-slide"
                ref={(el) => {
                  slidesRef.current[index] = el;
                }}>
                <img
                  src={`https://placehold.co/800x350?text=Image+${index + 1}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
            </Fragment>
          ))}
        </div>

        <button
          type="button"
          className="carousel-prev"
          onClick={() => setCurrent((c) => (c - 1 > -1 ? c - 1 : total - 1))}>
          PREV
        </button>

        <button
          type="button"
          className="carousel-next"
          onClick={() => setCurrent((c) => (c + 1 < total ? c + 1 : 0))}>
          NEXT
        </button>
      </div>
      <h1>Current Index: {current}</h1>
    </>
  );
}

// https://jsfiddle.net/21fx6ge7/
