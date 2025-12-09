'use client';
import { useState, useEffect, useRef, Fragment } from 'react';

export default function Home() {
  const animation = 300;
  const visibleSlides = 1;

  const moveDistance = 100 / visibleSlides;
  const elCarouselSlider = useRef<HTMLDivElement>(null);
  const elsSlides = useRef<HTMLDivElement[]>([]);

  let tot = elsSlides.current.length;
  let c = 0;

  const mod = (n: number, m: number): number => ((n % m) + m) % m;

  const anim = (ms = animation) => {
    if (!elCarouselSlider.current || !elsSlides.current.length) return;
    const cMod = mod(c, tot);
    console.log(animation);
    // Move slider
    elCarouselSlider.current.style.transitionDuration = `${ms}ms`;
    elCarouselSlider.current.style.transform = `translateX(calc(${
      (-c - visibleSlides) * moveDistance
    }%))`;
    // Handle active classes (slide and bullet)
    elsSlides.current.forEach((elSlide, i) =>
      elSlide.classList.toggle('is-active', cMod === i)
    );
  };

  const prev = () => {
    console.log('prev clicked');
    if (c <= -1) return; // prevent blanks on fast prev-click
    c -= 1;
    anim();
  };

  const next = () => {
    console.log('next clicked');
    if (c >= tot) return; // prevent blanks on fast next-click
    c += 1;
    anim();
  };

  // Infinite slide effect:
  elCarouselSlider.addEventListener('transitionend', () => {
    if (c <= -1) c = tot - 1;
    if (c >= tot) c = 0;
    anim(0); // quickly switch to "c" slide (with animation duration 0)
  });

  // Clone N first and last slides (for "infinite" slider effect)
  for (let i = 0; i < visibleSlides; i++) {
    elCarouselSlider.prepend(elsSlides[tot - 1 - i].cloneNode(true));
    elCarouselSlider.append(elsSlides[i].cloneNode(true));
  }

  // Initial slide
  anim(0);
  return (
    <div
      className="relative overflow-hidden"
      style={{ '--visible-slides': 3 } as React.CSSProperties}>
      <div
        ref={elCarouselSlider}
        className="flex">
        {Array.from({ length: 10 }, (_, index) => (
          <Fragment key={index}>
            <div
              ref={(element) => {
                if (element) elsSlides.current[index] = element;
              }}
              className="aspect-[4/1] bg-gray-800 text-white grow shrink-0 basis-full">
              <p>Slide {index + 1}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <button
        onClick={() => {
          prev();
        }}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 rounded-full w-16 h-8 text-sm text-white">
        PREV
      </button>
      <button
        onClick={() => {
          next();
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 rounded-full w-16 h-8 text-sm text-white">
        NEXT
      </button>
    </div>
  );
}

// https://jsfiddle.net/21fx6ge7/
