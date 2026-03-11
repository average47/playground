'use client';
import { FC, JSX, useEffect, useState } from 'react';

const slides = [
  {
    key: 0,
    content: '1',
  },
  {
    key: 1,
    content: '2',
  },
  {
    key: 2,
    content: '3',
  },
  {
    key: 3,
    content: '4',
  },
  {
    key: 4,
    content: '5',
  },
  {
    key: 5,
    content: '6',
  },
  {
    key: 6,
    content: '7',
  },
  {
    key: 7,
    content: '8',
  },
  {
    key: 8,
    content: '9',
  },
];

const Example: FC<any> = ({ ...props }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(slides.length / 2));
  const splitArray = (arr: any[]) => {
    const m = Math.ceil(arr.length / 2);
    const s = arr.slice(m);
    const f = arr.slice(0, m);
    return s.concat(f);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
      if (event.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-screen m-0 overflow-hidden text-white bg-[#e76f51]">
      <div className="h-full flex items-center justify-center">
        <ul className="transition-transform duration-500 ease-out">
          {splitArray(slides).map((slide: any, index: number) => (
            <li
              key={slide.key}
              className={`aspect-2/3 h-[25vh] rounded flex items-center justify-center text-6xl m-4 ${index === activeIndex ? 'bg-[#2a9d8f]' : 'bg-[#f4a261]'}`}>
              <span>{slide.content}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}>
          NEXT
        </button>
        <p className="font-extrabold border-l-2 pl-2 border-r-2 pr-2">
          Slide {slides[activeIndex].content}
        </p>
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
          }>
          PREV
        </button>
      </div>
    </div>
  );
};

export default Example;

// const appController = (function () {
//   const key = {
//     up: 38,
//     down: 40,
//   };

//   // Our total transformY value will be stored here
//   const data = {
//     total: {
//       Ytransform: 0,
//     },
//   };

//   return {
//     debounce: (func, wait) => {
//       let timeout;

//       return function executedFunction(...args) {
//         const later = () => {
//           timeout = null;
//           func(...args);
//         };

//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//       };
//     },

//     // Tells which direction it has to slide to
//     getDir: function (e) {
//       if (e <= -1 || e.keyCode === key.up || e.wich === key.up) {
//         return 'down';
//       } else if (e >= 1 || e.keyCode === key.down || e.wich === key.down) {
//         return 'up';
//       }
//     },

//     // Updates our total transformY value
//     updateTotal: function () {
//       return function (status, value) {
//         return status === 'inc'
//           ? (data.total.Ytransform += value)
//           : status === 'dec'
//             ? (data.total.Ytransform -= value)
//             : data.total.Ytransform;
//       };
//     },

//     getData: function () {
//       return data;
//     },
//   };
// })();
