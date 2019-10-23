import React from 'react';

import { ComponentReference } from './types';
import Component from './Component';

export default ({
  structure
}: {
  structure: ComponentReference[];
}): JSX.Element => (
  <>
    {structure.map(
      (reference: ComponentReference): JSX.Element => {
        const { name } = reference;
        return <Component key={`component_${name}`} reference={reference} />;
      }
    )}
  </>
);
