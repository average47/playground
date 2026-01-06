import { List, Progress } from '@/components';

export default function Home() {
  const data = {
    properties: {
      autoPlay: true,
      speed: 5000,
      visibleSlides: 1,
    },
    children: [
      { key: 0, label: 'Branding', color: '#DCD494' },
      { key: 1, label: 'Identity Design', color: '#D1805F' },
      { key: 2, label: 'Web Development', color: '#005871' },
      { key: 3, label: 'Social Media Setup', color: '#854C65' },
      { key: 4, label: 'Email Marketing', color: '#EFDADD' },
      { key: 5, label: 'Brochure Development', color: '#BE394F' },
      { key: 6, label: 'Logo Design', color: '#704A49' },
    ],
  };
  const lastTwo = data.children.splice(-2);
  data.children.unshift(...lastTwo);
  console.log('data', data);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <Progress strokeColor="#FF9F1E" /> */}
        <List data={data} />
      </main>
    </div>
  );
}

// https://jsfiddle.net/21fx6ge7/
