import React from 'react';

import { ComponentReference } from './types';

interface LinkProps {
  children?: JSX.Element | JSX.Element[];
}

const Component = ({
  reference
}: {
  reference: ComponentReference;
}): JSX.Element => {
  // eslint-disable-next-line
  console.log(reference);
  return (
    <div>Component </div>
    //   <ReactComponent key={`component_${name}`} options={{}}>
    //     {descendants.map(
    //       (component: ComponentReference): JSX.Element => (
    //         <Component reference={component} />
    //       )
    //     )}
    //   </ReactComponent>
    // );
  );
};

export default Component;
