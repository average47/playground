import { JSX } from 'react';
import { HTMLComment } from '@/lib/src/htmlComment';
import { Card, Carousel, Grid, Swimlane, Tabs, Thumbnails } from './index';

type ComponentType =
  | 'card'
  | 'carousel'
  | 'grid'
  | 'swimlane'
  | 'tabs'
  | 'thumbnails';

const typeToComponentMap: Record<ComponentType, React.ComponentType<any>> = {
  card: Card,
  carousel: Carousel,
  grid: Grid,
  swimlane: Swimlane,
  tabs: Tabs,
  thumbnails: Thumbnails,
};

export function renderComponent(data: any, index: number): JSX.Element {
  const name = data.type.toLowerCase() as ComponentType;
  const Component = typeToComponentMap[name];
  if (!Component) {
    return HTMLComment({
      text: `Component ${data.type} not found`,
      key: index,
    });
  }
  return (
    <Component
      key={index}
      {...data}
    />
  );
}

// list mode: Vertical, Swimlane:square|poster|network, Thumbnails || Grid || Carousel
