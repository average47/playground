import { Progress } from '@/components/Progress';

export default function Home() {
  const data = {
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
    ],
  };
  return (
    <div className="bg-amber-300 w-screen h-auto grid grid-cols-[5fr_1fr] gap-2">
      <div className="bg-amber-700 aspect-video w-full col-start-1 col-end-2 overflow-scroll flex">
        {data.children.map((item: any, idx: number) => (
          <div
            key={idx}
            style={{ backgroundColor: item.color }}
            className="w-full flex shrink-0 basis-full">
            This is item number {idx + 1}
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-2 w-full col-start-2 col-end-3 overflow-scroll">
        {data.children.map((item: any, idx: number) => (
          <li
            key={idx}
            style={{ backgroundColor: item.color }}
            className="bg-amber-500 block w-full">
            This is item number {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
