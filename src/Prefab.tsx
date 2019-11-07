import React from 'react';

import { ComponentReference } from './types';
import { Components } from './Component';

function Prefab({
  structure
}: {
  structure: ComponentReference[];
}): JSX.Element {
  return <Components references={structure} />;
}

export default Prefab;
