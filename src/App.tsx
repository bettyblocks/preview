import React, { useEffect, useState, ChangeEvent } from 'react';
import { Container, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, CSSProperties } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const currentPath = decodeURI(history.location.hash.replace('#/', ''));
  const classes: Record<string, string> = useStyles();
  const selectedPrefab = prefabs[currentPath];

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
            onChange={({
              target: { value }
            }: ChangeEvent<{ value: unknown }>): void => {
              history.push(`/#/${value}`);
            }}
            names={names}
            selected={currentPath}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Preview prefab={selectedPrefab || undefined} />
      </Container>
    </>
  );
}

export default App;
