/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { makeBuilder } from '@betty-blocks/component-helpers';
import makeComponent from '@betty-blocks/component-generator';
import { Styling } from '@betty-blocks/option-helpers';

import {
  ComponentReference,
  Component as ComponentT,
  OptionMap,
  Option
} from './types';

import { ComponentContext } from './Preview';
import ThemeContext from './ThemeContext';

const Link = (): void => {};
const Query = (): void => {};

const global = {
  Styling,
  ...makeBuilder({ screenOffset: 0 }, { Link, Query })
};

const generate = ({ jsx, styles }: ComponentT): Function => {
  const [error, ReactComponent] = makeComponent(
    { global, jsx, styles },
    React,
    ThemeContext
  );

  if (error) {
    throw error;
  }

  return ReactComponent;
};

const mockOptions = (options: Option[]): OptionMap =>
  options.reduce(
    (optionMap: OptionMap, { key, value }: Option): OptionMap => ({
      ...optionMap,
      [key]: value
    }),
    {}
  );

export function Components({
  references
}: {
  references: ComponentReference[];
}): JSX.Element {
  return (
    <>
      {references.map(
        (reference: ComponentReference, index: number): JSX.Element => {
          const { name } = reference;

          // eslint-disable-next-line react/no-array-index-key
          return <Component key={`${name}_${index}`} reference={reference} />;
        }
      )}
    </>
  );
}

export function Component({
  key,
  reference: { descendants, name, options }
}: {
  key: string;
  reference: ComponentReference;
}): JSX.Element | null {
  const { components } = useContext(ComponentContext);
  if (components === null) {
    return null;
  }
  const component = components[name];
  const ReactComponent = generate(component);
  const optionMap = mockOptions(options);

  return (
    <ReactComponent key={key} options={optionMap}>
      <Components references={descendants} />
    </ReactComponent>
  );
}
