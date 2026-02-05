import { FC, JSX } from 'react';
import { renderComponent } from '@/components/renderComponent';
import type { ITabItemProps, ICardProps } from './Tabs.types';
import './Tabs.css';

interface ITabProps {
  type: string;
  properties: {
    active: boolean;
    key: string;
    label: string;
    permalink: string;
  };
  children: any[];
}

const Tabs: FC<any> = ({ ...props }): JSX.Element => {
  const items = props.children || [];
  const max = Math.max(...items.map((item: ITabProps) => item.children.length));
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${items.length}, auto) 1fr`,
      }}
      className="w-full h-full col-start-1 col-span-3 row-start-1 row-span-3 grid gap-x-9">
      {items.map((item: ITabProps, index: number) => (
        <details
          key={item.properties.key}
          name="details"
          style={{ '--n': index + 1 } as React.CSSProperties}
          open={item.properties.active}>
          <summary className="font-labelPrimaryXL text-gray-500 cursor-pointer select-none">
            {item.properties.label}
          </summary>
          {renderComponent(item, index, max)}
        </details>
      ))}
    </div>
  );
};

export default Tabs;

// https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/
