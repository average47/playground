import { FC, JSX } from 'react';
import type { TabItem } from './Tabs.types';
import './Tabs.css';

const data = [
  {
    key: 0,
    summary: 'Recent Tracks',
    title: 'Your recent tracks:',
    items: [
      'The Beths - Mother, Pray For Me',
      'The Beths - Metal',
      'The Beths - No Joy',
      'The Beths - Mosquitoes',
      'The Beths - Straight Line Was A Lie',
    ],
  },
  {
    key: 1,
    summary: 'Loved tracks',
    title: 'Tracks you loved:',
    items: [
      'Marnie Stern - Believing Is Seeing',
      'FKA twigs - Girl Feels Good',
      'Fat Dog - Running',
      'Parquet Courts - Tenderness',
      'Sufjan Stevens - Will Anybody Ever Love Me?',
    ],
  },
  {
    key: 2,
    summary: 'Following',
    title: 'Artists you follow:',
    items: [
      'Amyl and the Sniffers',
      'Du Blonde',
      'Magdalena Bay',
      'Flying Lotus',
      'Horsegirl',
    ],
  },
];

const Tabs: FC<any> = ({ ...props }): JSX.Element => {
  const tabs = props.properties?.tabs || [];
  console.log('Rendering Tabs with props:', props.properties);
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-md w-full h-full col-start-1 col-span-3 row-start-1 row-span-3 gridClass">
      {tabs.map((tab: TabItem, index: number) => (
        <details
          key={tab.key}
          name="alpha"
          style={{ '--n': index + 1 } as React.CSSProperties}
          open={tab.active}>
          <summary>{tab.label}</summary>
          <div>
            {/* <p>{title}</p>
            <ul>
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul> */}
          </div>
        </details>
      ))}
    </div>
  );
};

export default Tabs;

// https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/
