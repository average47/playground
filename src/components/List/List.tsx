'use client';
import { useEffect, useState, useRef, JSX } from 'react';
import './List.css';
export default function List({ ...props }: any): JSX.Element {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
  }, []);

  //   items = container.find('li'),
  //   containerHeight = 0,
  //   numberVisible = 5,
  //   intervalSec = 2000;

  // if (!container.find('li:first').hasClass('first')) {
  //   container.find('li:first').addClass('first');
  // }

  // items.each(function () {
  //   if (index < numberVisible) {
  //     containerHeight = containerHeight + $(this).outerHeight();
  //     index++;
  //   }
  // });

  // container.css({ height: containerHeight, overflow: 'hidden' });

  // function vertCycle() {
  //   var firstItem = container.find('li.first').html();

  //   container.append('<li>' + firstItem + '</li>');
  //   firstItem = '';
  //   container
  //     .find('li.first')
  //     .animate({ marginTop: '-50px' }, 600, function () {
  //       $(this).remove();
  //       container.find('li:first').addClass('first');
  //     });
  // }

  // if (intervalSec < 700) {
  //   intervalSec = 700;
  // }

  // var init = setInterval('vertCycle()', intervalSec);

  // container.hover(
  //   function () {
  //     clearInterval(init);
  //   },
  //   function () {
  //     init = setInterval('vertCycle()', intervalSec);
  //   }
  // );

  return (
    <ul
      ref={containerRef}
      className="container">
      <li>Branding</li>
      <li>Identity Design</li>
      <li>Web Development</li>
      <li>Social Media Setup</li>
      <li>Email Marketing</li>
      <li>Brochure Development</li>
      <li>Logo Design</li>
    </ul>
  );
}
