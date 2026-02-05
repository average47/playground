import { FC, JSX } from 'react';

const Container: FC<any> = ({ ...props }): JSX.Element => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default Container;
