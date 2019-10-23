import React, { useContext } from 'react';

import { ComponentReference } from './types';
import { ComponentContext } from './Preview';
import ASDFGH from './ASDFGH';

const Component = ({
  reference: { descendants, name }
}: {
  reference: ComponentReference;
}): JSX.Element => {
  const { components } = useContext(ComponentContext);
  const component = components[name];
  const [error, ReactComponent] = ASDFGH(component);

  console.log(error);

  return (
    <ReactComponent key={`component_${name}`} options={{}}>
      {descendants.map(
        (component: ComponentReference): JSX.Element => (
          <Component reference={component} />
        )
      )}
    </ReactComponent>
  );
};

export default Component;
