'use client';
import { useState, useEffect, useRef, Fragment } from 'react';

export default function Home() {
  const el = (sel, par) => (par || document).querySelector(sel);
  const els = (sel, par) => (par || document).querySelectorAll(sel);
  const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

  // Helper functions:

  const mod = (n, m) => ((n % m) + m) % m;
  const prev = () => {
    console.log('prev clicked');
    // if (c <= -1) return; // prevent blanks on fast prev-click
    // c -= 1;
    // anim();
  };

  const next = () => {
    console.log('next clicked');
    // if (c >= tot) return; // prevent blanks on fast next-click
    // c += 1;
    // anim();
  };
  return (
    <div
      className="relative overflow-hidden"
      style={{ '--visible-slides': 3 } as React.CSSProperties}>
      <div className="flex">
        {Array.from({ length: 10 }, (_, index) => (
          <Fragment key={index}>
            <div className="aspect-[4/1] bg-gray-800 text-white grow shrink-0 basis-full">
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

// <div className="bg-amber-300 w-screen h-auto grid grid-cols-[5fr_1fr] gap-2">
//       <div className="bg-amber-700 aspect-video w-full col-start-1 col-end-2 overflow-scroll flex">
//         {data.children.map((item: any, idx: number) => (
//           <div
//             key={idx}
//             style={{ backgroundColor: item.color }}
//             className="w-full flex shrink-0 basis-full">
//             This is item number {idx + 1}
//           </div>
//         ))}
//       </div>
//       <ul className="flex flex-col gap-2 w-full col-start-2 col-end-3 overflow-scroll">
//         {data.children.map((item: any, idx: number) => (
//           <li
//             key={idx}
//             style={{ backgroundColor: item.color }}
//             className="bg-amber-500 block w-full">
//             This is item number {idx + 1}
//           </li>
//         ))}
//       </ul>
//     </div>

// https://jsfiddle.net/21fx6ge7/
