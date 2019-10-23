import React, { ChangeEvent } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((): object => ({
  formControl: {
    marginTop: '12px'
  },
  select: {
    minWidth: 120
  }
}));

export default ({
  onChange,
  names,
  selected
}: {
  onChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  names: string[];
  selected: string;
}): JSX.Element => {
  const classes: Record<string, string> = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-prefab">Prefab</InputLabel>
      <Select
        autoWidth
        className={classes.select}
        inputProps={{ id: 'select-prefab' }}
        onChange={onChange}
        value={selected}
      >
        <MenuItem key="select_empty" value="">
          <em>none</em>
        </MenuItem>
        {names.map(
          (name: string): JSX.Element => (
            <MenuItem key={`select_${name}`} value={name}>
              {name}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};
