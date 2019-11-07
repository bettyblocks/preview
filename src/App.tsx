import React, { useEffect, useState } from 'react';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, CSSProperties } from '@material-ui/styles';

import Select from './Select';
import { Prefab } from './types';
import Preview from './Preview';
import { fetchList, normalize } from './util';

const useStyles = makeStyles(
  (): Record<string, CSSProperties> => ({
    appBar: {
      background: '#f0f1f5'
    },
    logo: {
      height: '1.75rem',
      width: '2rem'
    }
  })
);

function App(): JSX.Element {
  const [prefabs, setPrefabs] = useState({} as Record<string, Prefab>);
  const [names, setNames] = useState([] as string[]);
  const [selected, select] = useState('');
  const classes: Record<string, string> = useStyles();

  useEffect((): void => {
    fetchList<Prefab>('prefabs').then((list: Prefab[]): void => {
      setNames(list.map(({ name }: Prefab): string => name));
      setPrefabs(normalize<Prefab>(list));
    });
  }, []);

  return (
    <>
      <AppBar className={classes.appBar} elevation={0} position="sticky">
        <Toolbar>
          <img
            className={classes.logo}
            src="./logo-icon.svg"
            alt="Betty Blocks logo"
          />
          <Select
            onChange={({ target: { value } }): void => select(value as string)}
            names={names}
            selected={selected}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Preview prefab={prefabs[selected] || null} />
      </Container>
    </>
  );
}

export default App;
