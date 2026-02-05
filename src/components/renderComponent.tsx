import { JSX } from 'react';
import { HTMLComment } from '@/lib/src/htmlComment';
import {
  Card,
  Carousel,
  Container,
  Grid,
  List,
  Swimlane,
  Tabs,
  Thumbnails,
} from './index';

type ComponentType =
  | 'container'
  | 'card'
  | 'carousel'
  | 'grid'
  | 'list'
  | 'swimlane'
  | 'tabs'
  | 'thumbnails';

const typeToComponentMap: Record<ComponentType, React.ComponentType<any>> = {
  container: Container,
  card: Card,
  carousel: Carousel,
  grid: Grid,
  list: List,
  swimlane: Swimlane,
  tabs: Tabs,
  thumbnails: Thumbnails,
};

export function renderComponent(
  data: any,
  index: number,
  max?: number
): JSX.Element {
  const name = data.type.toLowerCase() as ComponentType;
  const Component = typeToComponentMap[name];
  if (!Component) {
    return HTMLComment({
      text: `Component ${data.type} not found`,
      key: index,
    });
  }
  if ('properties' in data && max !== undefined) {
    data.properties = { ...data.properties, maxItems: max };
  }
  return (
    <Component
      key={index}
      {...data}
    />
  );
}
