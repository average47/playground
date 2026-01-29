import { FC, JSX } from 'react';

const Swimlane: FC<any> = ({ ...props }): JSX.Element => {
  switch (props.mode) {
    case 'network':
      // code block
      break;
    case 'landscape':
      // code block
      break;
    case 'poster':
      // code block
      break;
    case 'square':
      // code block
      break;
    default:
    // code block
  }
  return <h1>Swimlane Component</h1>;
};

export default Swimlane;
