'use client';

import { FC, JSX, useCallback, useEffect, useRef, useState } from 'react';
import './Carousel.css';

const Carousel: FC<any> = ({ ...props }): JSX.Element => {
  const elCarousel = useRef<HTMLDivElement>(null);
  const elCarouselSlider = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = 6; // Total slides (should ideally be dynamic based on children)
  const ms = 500;
  const visibleSlides = 1;
  const moveDistance = 100 / visibleSlides;

  // DOM utility functions:

  // const el = (sel, par) => (par || document).querySelector(sel);
  // const els = (sel, par) => (par || document).querySelectorAll(sel);
  // const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

  // Helper functions:

  // Task: Carousel:

  // const carousel = (elCarousel) => {
  //   const animation =
  //     +getComputedStyle(elCarousel).getPropertyValue('--animation') ?? 500;
  //   const visibleSlides =
  //     +getComputedStyle(elCarousel).getPropertyValue('--visible-slides') ?? 1;

  //   const moveDistance = 100 / visibleSlides;
  //   const elCarouselSlider = el('.carousel-slider', elCarousel);
  //   const elsSlides = els('.carousel-slide', elCarouselSlider);
  //   const elsBtns = [];

  //   let tot = elsSlides.length; // Total slides
  //   let c = 0;

  //   if (tot < visibleSlides) return; // Not enough slides. Do nothing.

  //   // Methods:
  //   const anim = (ms = animation) => {
  //     const cMod = mod(c, tot);
  //     console.log(animation);
  //     // Move slider
  //     elCarouselSlider.style.transitionDuration = `${ms}ms`;
  //     elCarouselSlider.style.transform = `translateX(calc(${(-c - visibleSlides) * moveDistance}%))`;
  //     // Handle active classes (slide and bullet)
  //     elsSlides.forEach((elSlide, i) =>
  //       elSlide.classList.toggle('is-active', cMod === i)
  //     );
  //     elsBtns.forEach((elBtn, i) =>
  //       elBtn.classList.toggle('is-active', cMod === i)
  //     );
  //   };

  //   const goto = (index) => {
  //     c = index;
  //     anim();
  //   };

  //   // Buttons:

  //   // Navigation:

  //   const elNavigation = elNew('div', {
  //     className: 'carousel-navigation',
  //   });

  //   // Events:

  //   // Infinite slide effect:
  //   elCarouselSlider.addEventListener('transitionend', () => {
  //     if (c <= -1) c = tot - 1;
  //     if (c >= tot) c = 0;
  //     anim(0); // quickly switch to "c" slide (with animation duration 0)
  //   });

  //   // Init:

  //   // Insert UI elements:
  //   elCarousel.append(elPrev, elNext);

  //   // Clone N first and last slides (for "infinite" slider effect)
  //   for (let i = 0; i < visibleSlides; i++) {
  //     elCarouselSlider.prepend(elsSlides[tot - 1 - i].cloneNode(true));
  //     elCarouselSlider.append(elsSlides[i].cloneNode(true));
  //   }

  //   // Initial slide
  //   anim(0);
  // };

  // // Allows to use multiple carousels on the same page:
  // els('.carousel').forEach(carousel);

  useEffect(() => {
    console.log('Current slide:', current);
  }, [current]);

  const anim = () => {
    if (!elCarouselSlider.current) return;

    elCarouselSlider.current.style.transitionDuration = `${ms}ms`;
    elCarouselSlider.current.style.transform = `translateX(calc(${(-current - visibleSlides) * moveDistance}%))`;
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1 < total ? prev + 1 : 0));
    anim();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 < 0 ? total - 1 : prev - 1));
    anim();
  };

  return (
    <div
      ref={elCarousel}
      className="carousel">
      <div
        ref={elCarouselSlider}
        className="carousel-slider">
        <div className="carousel-slide">
          <img
            src="https://placehold.co/600x400?text=Image+1"
            alt="Image 1"
          />
        </div>
        <div className="carousel-slide">
          <img
            src="https://placehold.co/600x400?text=Image+2"
            alt="Image 2"
          />
        </div>
        <div className="carousel-slide">
          <img
            src="https://placehold.co/600x400?text=Image+3"
            alt="Image 3"
          />
        </div>
        <div className="carousel-slide">
          <img
            src="https://placehold.co/600x400?text=Image+4"
            alt="Image 4"
          />
        </div>
        <div className="carousel-slide">
          <img
            src="https://placehold.co/600x400?text=Image+5"
            alt="Image 5"
          />
        </div>
        <div className="carousel-slide">
          <img
            src="https://placehold.co/600x400?text=Image+6"
            alt="Image 6"
          />
        </div>
      </div>
      <button
        onClick={prevSlide}
        type="button"
        className="carousel-prev">
        <span>Prev</span>
      </button>
      <button
        onClick={nextSlide}
        type="button"
        className="carousel-next">
        <span>Next</span>
      </button>
      <h1 className="text-white">{current}</h1>
    </div>
  );
};

export default Carousel;

// https://jsfiddle.net/21fx6ge7/
