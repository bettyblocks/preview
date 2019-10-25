import React, { useContext } from 'react';
import { makeBuilder } from '@betty-blocks/component-helpers';
import makeComponent from '@betty-blocks/component-generator';

import { ComponentReference } from './types';
import { ComponentContext } from './Preview';

interface LinkProps {
  children?: JSX.Element | JSX.Element[];
}

const Component = ({
  reference: { descendants, name }
}: {
  reference: ComponentReference;
}): JSX.Element => {
  const { components } = useContext(ComponentContext);
  const { jsx, styles } = components[name];

  function Link({
    children
  }: LinkProps): JSX.Element | JSX.Element[] | undefined {
    return children;
  }

  const [error, ReactComponent] = makeComponent({
    jsx,
    styles
  });

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
