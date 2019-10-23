import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';

import Select from './Select';
import normalize from './util';
import { Prefab } from './types';
import Preview from './Preview';

const uri = 'http://localhost:5001';

export default (): JSX.Element => {
  const [prefabs, setPrefabs] = useState({} as Record<string, Prefab>);
  const [names, setNames] = useState([] as string[]);
  const [selected, select] = useState('');

  useEffect(() => {
    fetch(`${uri}/prefabs.json`, { cache: 'no-cache' })
      .then(response => response.json())
      .then(list => {
        setNames(list.map(({ name }: Prefab): string => name));
        setPrefabs(normalize<Prefab>(list));
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Select
        onChange={({ target: { value } }): void => select(value as string)}
        names={names}
        selected={selected}
      />
      <Preview prefab={prefabs[selected] || null} />
    </Container>
  );
};
