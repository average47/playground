'use client';
import { useState, useEffect, useRef, JSX } from 'react';
import Image from 'next/image';
// import { CarouselProps } from './Carousel.types';
import { Icon } from '../Icon';
import './Carousel.css';

const placeholderImages = [
  'https://images.unsplash.com/photo-1523815378073-a43ae3fbf36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80',
  'https://images.unsplash.com/photo-1512203492609-972c16baa28b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  'https://images.unsplash.com/photo-1487803836022-91054ca05fdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  'https://images.unsplash.com/photo-1530143584546-02191bc84eb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
];

export default function Carousel({ ...props }: any): JSX.Element {
  // console.log('Carousel props:', props);
  const [index, setIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLUListElement>(null);
  const slides = useRef<Array<HTMLLIElement>>([]);

  useEffect(() => {
    // Initial slides position, so user can go from first to last slide (click to the left first)
    slider.current!.prepend(slides.current[slides.current.length - 1]);
  }, []);

  // Creating dot for each slide
  // const createDots = (carousel, initSlides) => {
  //   const dotsContainer = document.createElement('div');
  //   dotsContainer.classList.add('carousel_nav');

  //   initSlides.forEach((slide, index) => {
  //     const dot = document.createElement('button');
  //     dot.type = 'button';
  //     dot.classList.add('carousel_dot');
  //     dot.setAttribute('aria-label', `Slide number ${index + 1}`);
  //     slide.dataset.position = index;
  //     slide.classList.contains('selected') &&
  //       dot.classList.add('selected');
  //     dotsContainer.appendChild(dot);
  //   });

  //   carousel.appendChild(dotsContainer);

  //   return dotsContainer;
  // };

  // Updating relevant dot
  // const updateDot = (slide) => {
  //   const currDot = dotNav.querySelector('.selected');
  //   const targetDot = slide.dataset.position;

  //   currDot.classList.remove('selected');
  //   dots[targetDot].classList.add('selected');
  // };

  // Handling arrow buttons
  const handleClick = (direction: number): void => {
    console.log('handleClick dir:', direction);

    //     slides = [...slider.children];
    //     const currSlide = slider.querySelector('.selected');
    //     currSlide.classList.remove('selected');
    //     let targetSlide;

    //     if (arrow.classList.contains('jsPrev')) {
    //       targetSlide = currSlide.previousElementSibling;
    //       slider.prepend(slides[slides.length - 1]);
    //     }

    //     if (arrow.classList.contains('jsNext')) {
    //       targetSlide = currSlide.nextElementSibling;
    //       slider.append(slides[0]);
    //     }

    //     targetSlide.classList.add('selected');
    //     updateDot(targetSlide);
  };

  // const buttons = carousel.querySelectorAll('.carousel_btn');
  // buttons.forEach(handleClick);

  // Handling dot buttons
  // const handleDotClick = (dot) => {
  //   const dotIndex = dots.indexOf(dot);
  //   const currSlidePos = slider.querySelector('.selected').dataset.position;
  //   const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`)
  //     .dataset.position;

  //   if (currSlidePos < targetSlidePos) {
  //     const count = targetSlidePos - currSlidePos;
  //     for (let i = count; i > 0; i--) nextBtn.click();
  //   }

  //   if (currSlidePos > targetSlidePos) {
  //     const count = currSlidePos - targetSlidePos;
  //     for (let i = count; i > 0; i--) prevBtn.click();
  //   }
  // };

  // const dotNav = createDots(carousel, slides);
  // const dots = [...dotNav.children];
  // const prevBtn = buttons[0];
  // const nextBtn = buttons[1];

  // dotNav.addEventListener('click', (e) => {
  //   const dot = e.target.closest('button');
  //   if (!dot) return;
  //   handleDotClick(dot);
  // });

  // Auto sliding
  // const slideTiming = 5000;
  // let interval;
  // const slideInterval = () =>
  //   (interval = setInterval(() => nextBtn.click(), slideTiming));

  // carousel.addEventListener('mouseover', () => clearInterval(interval));
  // carousel.addEventListener('mouseleave', slideInterval);
  // slideInterval();

  return (
    <main className="main">
      <div
        className="carousel"
        ref={carousel}>
        <button
          onClick={() => handleClick(-1)}
          type="button"
          className="carousel_btn jsPrev"
          aria-label="Previous slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </button>

        <div className="carousel_track-container">
          <ul
            ref={slider}
            className="carousel_track">
            {placeholderImages.map((src, idx) => (
              <li
                className={`carousel_slide ${idx === index ? 'selected' : ''}`}
                key={idx}
                ref={(el) => {
                  if (el) slides.current[idx] = el;
                }}>
                <div className="carousel_image">
                  <img
                    src={src}
                    alt=""
                    role="presentation"
                  />
                </div>
                <h2 className="carousel_title">Slide {idx + 1}</h2>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => handleClick(1)}
          type="button"
          className="carousel_btn jsNext"
          aria-label="Next slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </button>
      </div>
    </main>
  );
}

// https://codepen.io/frontendmax/pen/abbBzpq
