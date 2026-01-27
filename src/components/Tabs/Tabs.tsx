import { FC, JSX } from 'react';

const Tabs: FC<any> = ({ ...props }): JSX.Element => {
  return (
    <div className="grid">
      {/* First tab: set to open */}
      <details
        className="item"
        name="alpha"
        open>
        <summary className="subitem">First item</summary>
        <div>{/* etc. */}</div>
      </details>
      <details
        className="item"
        name="alpha">
        <summary className="subitem">Second item</summary>
        <div>{/* etc. */}</div>
      </details>
      <details
        className="item"
        name="alpha">
        <summary className="subitem">Third item</summary>
        <div>{/* etc. */}</div>
      </details>
    </div>
  );
};

export default Tabs;

// https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/
