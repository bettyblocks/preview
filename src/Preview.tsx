import React, { createContext, useEffect, useState } from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Prefab as PrefabT, ComponentContextProps, Component } from './types';
import Prefab from './Prefab';
import normalize from './util';

const uri = 'http://localhost:5001';

const useStyles = makeStyles(() => ({
  prefab: {
    marginTop: '24px'
  }
}));

export const ComponentContext = createContext<ComponentContextProps>({
  components: {}
});

export default ({ prefab }: { prefab: PrefabT | null }): JSX.Element => {
  const [components, setComponents] = useState({} as Record<string, Component>);
  const classes: Record<string, string> = useStyles();

  useEffect(() => {
    fetch(`${uri}/templates.json`, { cache: 'no-cache' })
      .then(response => response.json())
      .then(list => {
        setComponents(normalize<Component>(list));
      });
  }, []);

  if (prefab === null) {
    return (
      <Card className={classes.prefab}>
        <CardContent>
          <Typography variant="body1">
            Select a Prefab to get started.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { name, structure } = prefab;

  return (
    <Card className={classes.prefab}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <ComponentContext.Provider value={{ components }}>
          <Prefab structure={structure} />
        </ComponentContext.Provider>
      </CardContent>
    </Card>
  );
};
