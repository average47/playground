import { Carousel, List } from '@/components';

export default function Home() {
  const data = {
    properties: {
      autoPlay: true,
      speed: 5000,
      visibleSlides: 1,
    },
    children: [
      { color: '#DCD494' },
      { color: '#D1805F' },
      { color: '#005871' },
      { color: '#854C65' },
      { color: '#EFDADD' },
      { color: '#BE394F' },
      { color: '#704A49' },
      { color: '#8F3D37' },
      { color: '#DC343B' },
      { color: '#82643E' },
      { color: '#58423F' },
      { color: '#BDBEBF' },
      { color: '#464B65' },
      { color: '#5B3644' },
    ],
  };
  return (
    <>
      <List />
      {/* <Carousel {...data} /> */}
    </>
  );
}

// https://jsfiddle.net/21fx6ge7/
