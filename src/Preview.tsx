import ErrorBoundary from 'react-error-boundary';
import React, { createContext, useEffect, useState, Context } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Container, Typography } from '@material-ui/core';
import { createTheming } from 'react-jss';
import { Theming } from 'theming';

import { Prefab as PrefabT, ComponentContextProps, Component } from './types';
import { fetchList, normalize } from './util';
import Prefab from './Prefab';
import theme from './theme';

const ThemingContext = ('__APP_THEME__' as unknown) as Context<unknown>;
const { ThemeProvider } = createTheming(ThemingContext) as Theming<object>;

export const ComponentContext = createContext<ComponentContextProps>({
  components: {}
});

function Fallback({ error }: { error?: Error }): JSX.Element {
  return (
    <>
      <Typography>Your component could not be rendered.</Typography>
      {error && (
        <SyntaxHighlighter language="bash">{error.message}</SyntaxHighlighter>
      )}
    </>
  );
}

function Preview({ prefab }: { prefab: PrefabT | null }): JSX.Element {
  const [components, setComponents] = useState({} as Record<string, Component>);

  useEffect((): void => {
    fetchList<Component>('templates').then((list: Component[]): void => {
      setComponents(normalize<Component>(list));
    });
  }, []);

  return (
    <>
      <Container maxWidth="md">
        {prefab === null ? (
          <Typography variant="body1">
            Select a Prefab to get started.
          </Typography>
        ) : (
          <ComponentContext.Provider value={{ components }}>
            <ErrorBoundary FallbackComponent={Fallback}>
              <ThemeProvider theme={theme}>
                <Prefab structure={prefab.structure} />
              </ThemeProvider>
            </ErrorBoundary>
          </ComponentContext.Provider>
        )}
      </Container>
    </>
  );
}

export default Preview;
