import React, { useEffect, useState } from 'react';

import {
  Drawer,
  Typography,
  TextField,
  List,
  ListItem,
  Switch,
  FormLabel,
  FormGroup,
  Slider
} from '@material-ui/core';

import { makeStyles, CSSProperties } from '@material-ui/styles';

import Select from './Select';
import { Prefab, ComponentReference, Option } from './types';
import Preview from './Preview';
import { fetchList, normalize } from './util';

const useAppStyles = makeStyles(
  (): Record<string, CSSProperties> => ({
    drawerPaper: {
      alignItems: 'center',
      background: '#f0f1f5',
      padding: '24px 36px'
    },
    logo: {
      width: '3rem'
    },
    main: {
      margin: '2rem'
    }
  })
);

const useInputStyles = makeStyles(
  (): Record<string, CSSProperties> => ({
    formGroup: {
      width: '100%'
    },
    input: {}
  })
);

const useOptionsStyles = makeStyles(
  (): Record<string, CSSProperties> => ({
    options: {
      width: '100%'
    }
  })
);

const marks = [
  {
    label: 'None',
    value: 0
  },
  {
    label: 'S',
    value: 25
  },
  {
    label: 'M',
    value: 50
  },
  {
    label: 'L',
    value: 75
  },
  {
    label: 'XL',
    value: 100
  }
];

function OptionComponent({
  option: { label, type, value }
}: {
  option: Option;
}): JSX.Element {
  const classes: Record<string, string> = useInputStyles();

  if (['ENDPOINT', 'ICON', 'TEXT', 'VARIABLE'].includes(type)) {
    return (
      <TextField
        className={classes.input}
        defaultValue={value}
        fullWidth
        label={label}
      />
    );
  }

  if (['SIZE', 'SIZES'].includes(type)) {
    return (
      <FormGroup className={classes.formGroup}>
        <FormLabel component="legend">{label}</FormLabel>
        <Slider
          aria-labelledby="discrete-slider"
          defaultValue={0}
          marks={marks}
          max={100}
          min={0}
          step={25}
          valueLabelDisplay="off"
        />
      </FormGroup>
    );
  }

  switch (type) {
    case 'NUMBER':
      return (
        <TextField
          className={classes.input}
          fullWidth
          label={label}
          type="number"
        />
      );

    case 'TOGGLE':
      return (
        <FormGroup className={classes.formGroup}>
          <FormLabel component="legend">{label}</FormLabel>
          <Switch checked={value as boolean} />
        </FormGroup>
      );

    default:
      return (
        <Typography className={classes.input}>
          {label}: {type}
        </Typography>
      );
  }
}

const getOptions = (references: ComponentReference[]): Option[] =>
  references.reduce(
    (acc: Option[], { descendants, options }: ComponentReference): Option[] => [
      ...acc,
      ...options,
      ...getOptions(descendants)
    ],
    []
  );

function Options({ prefab: { structure } }: { prefab: Prefab }): JSX.Element {
  const options = getOptions(structure);
  const classes: Record<string, string> = useOptionsStyles();

  return (
    <List className={classes.options}>
      {options.map(
        (option: Option): JSX.Element => (
          <ListItem disableGutters>
            <OptionComponent option={option} />
          </ListItem>
        )
      )}
    </List>
  );
}

function App(): JSX.Element {
  const [prefabs, setPrefabs] = useState({} as Record<string, Prefab>);
  const [names, setNames] = useState([] as string[]);
  const [selected, select] = useState('');
  const classes: Record<string, string> = useAppStyles();

  useEffect((): void => {
    fetchList<Prefab>('prefabs').then((list: Prefab[]): void => {
      setNames(list.map(({ name }: Prefab): string => name));
      setPrefabs(normalize<Prefab>(list));
    });
  }, []);

  const selectedPrefab = prefabs[selected];

  return (
    <>
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
      >
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
        {selectedPrefab && <Options prefab={selectedPrefab} />}
      </Drawer>
      <main className={classes.main}>
        <Preview prefab={selectedPrefab || null} />
      </main>
    </>
  );
}

export default App;
