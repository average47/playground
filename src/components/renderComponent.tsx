import { JSX } from 'react';
import { HTMLComment } from '@/lib/src/htmlComment';
import { Tabs } from './index';

type ComponentType = 'tabs';

const typeToComponentMap: Record<ComponentType, React.ComponentType<any>> = {
  tabs: Tabs,
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
