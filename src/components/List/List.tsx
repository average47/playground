'use client';
import {
  Fragment,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  use,
} from 'react';

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
  const [direction, setDirection] = useState(-1);
  const [index, setIndex] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const container = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number>(0);

  const windowSizeHandler = () => {
    if (!container.current) return;
    setHeight(container.current.children[0].getBoundingClientRect().height);
  };

  const transitionHandler = () => {
    if (!container.current) return;
    setInTransition(false);
    console.log('transition ended');
    if (direction === 1) {
      container.current.prepend(container.current.lastElementChild!);
    }
    if (direction === -1) {
      container.current.appendChild(container.current.firstElementChild!);
    }
  };

  const handleClick = (dir: number): void => {
    if (!container.current) return;
    setInTransition(true);
    setDirection(dir);
    if (dir === 1) {
      container.current.style.transform = `translateY(0px)`;
      setIndex((prev) => (prev - 1 + items.length) % items.length);
    }
    if (dir === -1) {
      container.current.style.transform = `translateY(-${height}px)`;
      setIndex((prev) => (prev + 1) % items.length);
    }
  };

  useLayoutEffect(() => {
    if (!container.current) return;
    setHeight(container.current.children[0].getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    if (!container.current) return;
    container.current.prepend(container.current.lastElementChild!);
    setHeight(container.current.children[0].getBoundingClientRect().height);
    window.addEventListener('resize', windowSizeHandler);
    container.current.addEventListener('transitionend', transitionHandler);
    return () => {
      window.removeEventListener('resize', windowSizeHandler);
      container.current?.removeEventListener(
        'transitionend',
        transitionHandler
      );
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="carousel w-80 h-60 p-0 m-12 border-10 border-white shadow-md overflow-hidden">
          <ul
            ref={container}
            className="flex flex-col justify-start transition-transform duration-500 ease-in-out">
            {items.map((item, idx) => (
              <Fragment key={idx}>
                <li
                  data-index={idx}
                  className="bg-[#f7f7f7] text-[#dddddd] w-full aspect-4/1 transition-colors duration-500 ease-in-out inline-flex items-center justify-center">
                  {item}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => handleClick(-1)}>
        Next
      </button>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => handleClick(1)}>
        Previous
      </button>
      <pre className="text-xs text-gray-400">
        {items.join(', ')} | {index} | {height}px
      </pre>
    </>
  );
}
