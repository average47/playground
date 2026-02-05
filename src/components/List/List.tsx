import { Fragment, FC, JSX } from 'react';
import { renderComponent } from '@/components/renderComponent';
import { getRandomTenDigitNumber, HTMLComment } from '@/lib';

const List: FC<any> = ({ ...props }): JSX.Element => {
  const display = (mode: string): JSX.Element => {
    switch (mode) {
      case 'network':
        return <p>Network</p>;
      case 'landscape':
        return <p>Landscape</p>;
      case 'poster':
        return <p>Poster</p>;
      case 'square':
        return <p>Square</p>;
      case 'grid':
        return (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-9">
            {props.children.map((child: any, index: number) => (
              <Fragment key={index}>{renderComponent(child, index)}</Fragment>
            ))}
            {[
              ...new Array(props.properties.maxItems - props.children.length),
            ].map((_, index) => (
              <div key={index} />
            ))}
          </div>
        );
      default:
        return HTMLComment({
          text: `List Component ${mode} not found`,
          key: getRandomTenDigitNumber(),
        });
    }
  };
  return <>{display(props.properties.mode)}</>;
};

export default List;
