'use client';
import { dir } from 'console';
import {
  Fragment,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  use,
} from 'react';

const items = [
  { key: 0, label: 'Branding' },
  { key: 1, label: 'Identity Design' },
  { key: 2, label: 'Web Development' },
  { key: 3, label: 'Social Media Setup' },
  { key: 4, label: 'Email Marketing' },
  { key: 5, label: 'Brochure Development' },
  { key: 6, label: 'Logo Design' },
];

interface ListProps {
  data: {
    properties: {
      autoPlay: boolean;
      speed: number;
      visibleSlides: number;
    };
    children: { key: number; label: string; color: string }[];
  };
}
export default function List({ data }: ListProps) {
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
    if (dir === 1) {
      container.current.prepend(container.current.lastElementChild!);
      setIndex((prev) => (prev - 1 + items.length) % items.length);
    }
    if (dir === -1) {
      container.current.appendChild(container.current.firstElementChild!);
      setIndex((prev) => (prev + 1) % items.length);
    }
    setDirection((prev) => (prev === dir ? prev : dir));
  };

  useLayoutEffect(() => {
    if (!container.current) return;
    setHeight(container.current.children[0].getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    if (!container.current) return;
    setHeight(container.current.children[0].getBoundingClientRect().height);
    window.addEventListener('resize', windowSizeHandler);
    return () => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, [height, index]);

  return (
    <>
      <div className="container">
        <div className="carousel w-80 h-60 p-0 m-12 border-10 border-white shadow-md overflow-hidden">
          <ul
            style={{
              transform: `translateY(-${height * (index + 1)}px)`,
            }}
            ref={container}
            className="flex flex-col justify-start transition-transform duration-500 ease-in-out">
            {data.children.map(
              (item: { key: number; label: string; color: string }) => (
                <Fragment key={item.key}>
                  <li
                    data-index={item.key}
                    className={`w-full aspect-4/1 transition-colors duration-500 ease-in-out inline-flex items-center justify-center ${
                      item.key === index
                        ? 'text-[#fff] bg-[#1998c4]'
                        : 'bg-[#f7f7f7] text-[#dddddd]'
                    }`}>
                    {item.label}
                  </li>
                </Fragment>
              )
            )}
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
        {index} | {height}px | {direction === 1 ? 'up' : 'down'}
      </pre>
    </>
  );
}
