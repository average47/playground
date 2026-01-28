import { FC, JSX } from 'react';
import type { ITabProps, ITabItemProps, ICardProps } from './Tabs.types';
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
  const items = props.children || [];
  const renderChildren = (item: ITabItemProps[]) => {
    return JSON.stringify(item[0].children, null, 2);
  };
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${tabs.length}, minmax(200px, 1fr))`,
      }}
      className="w-full h-full col-start-1 col-span-3 row-start-1 row-span-3 gridClass grid">
      {tabs.map((tab: ITabProps, index: number) => (
        <details
          key={tab.key}
          name="details"
          style={{ '--n': index + 1 } as React.CSSProperties}
          open={tab.active}>
          <summary>{tab.label}</summary>
          <div>
            <ul>
              {items
                .filter((item: ITabItemProps) => item.properties.id === tab.key)
                .map((item: ITabItemProps, itemIndex: number) => (
                  <li key={itemIndex}>
                    <pre>{JSON.stringify(item.children, null, 2)}</pre>
                  </li>
                ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
};

export default Tabs;

// https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/
