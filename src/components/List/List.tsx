'use client';
import { Fragment, useState, useEffect, useRef } from 'react';

const items = [
  'Branding',
  'Identity Design',
  'Web Development',
  'Social Media Setup',
  'Email Marketing',
  'Brochure Development',
  'Logo Design',
];

export default function List() {
  const [index, setIndex] = useState(0);
  const container = useRef<HTMLUListElement>(null);

  // const vertCycle = () => {
  //   var firstItem = container.current?.querySelector('li.first')?.innerHTML;

  //   container.current?.insertAdjacentHTML(
  //     'beforeend',
  //     '<li>' + firstItem + '</li>'
  //   );
  //   firstItem = '';
  //   container.current
  //     .querySelector('li.first')
  //     .animate({ marginTop: '-50px' }, 600, function () {
  //       $(this).remove();
  //       container.current?.querySelector('li:first')?.classList.add('first');
  //     });
  // };

  useEffect(() => {
    if (!container.current) return;
    container.current.prepend(container.current.lastElementChild!);
  }, []);

  return (
    <>
      <ul
        ref={container}
        className="container w-80 h-60 p-0 m-12 border-10 border-white shadow-md overflow-hidden flex flex-col justify-start">
        {items.map((item, idx) => (
          <Fragment key={idx}>
            <li
              data-index={idx}
              className={`${
                idx === index
                  ? 'bg-[#1998c4] text-white'
                  : 'bg-[#f7f7f7] text-[#dddddd]'
              } w-full aspect-4/1 transition-colors duration-500 ease-in-out inline-flex items-center justify-center`}>
              {item}
            </li>
          </Fragment>
        ))}
      </ul>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => {
          if (!container.current) return;
          container.current.appendChild(container.current.firstElementChild!);
          setIndex((prev) => (prev + 1) % items.length);
        }}>
        Next
      </button>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => {
          if (!container.current) return;
          container.current.prepend(container.current.lastElementChild!);
          setIndex((prev) => (prev - 1 + items.length) % items.length);
        }}>
        Previous
      </button>
      <pre className="text-xs text-gray-400">
        {items.join(', ')} | {index}
      </pre>
    </>
  );
}
