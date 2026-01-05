import { List, Progress } from '@/components';

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <Progress strokeColor="#FF9F1E" /> */}
        <List />
      </main>
    </div>
  );
}

// https://jsfiddle.net/21fx6ge7/
