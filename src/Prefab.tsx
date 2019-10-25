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
        return <Component key={reference.name} reference={reference} />;
      }
    )}
  </>
);
