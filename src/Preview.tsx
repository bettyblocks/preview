import ErrorBoundary from 'react-error-boundary';
import React, { createContext, useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Card, Typography, CardContent } from '@material-ui/core';
import { createTheming } from 'react-jss';
import { makeStyles, CSSProperties } from '@material-ui/styles';
import { Theming } from 'theming';

import { Prefab as PrefabT, ComponentContextProps, Component } from './types';
import { fetchList, normalize } from './util';
import Prefab from './Prefab';
import theme from './theme';
import ThemeContext from './ThemeContext';

const useStyles = makeStyles(
  (): Record<string, CSSProperties> => ({
    card: {
      marginTop: 24
    },
    cardContent: {
      paddingBottom: '16px !important'
    }
  })
);

const { ThemeProvider } = createTheming(ThemeContext) as Theming<object>;

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
  const classes: Record<string, string> = useStyles();

  useEffect((): void => {
    fetchList<Component>('templates').then((list: Component[]): void => {
      setComponents(normalize<Component>(list));
    });
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
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
      </CardContent>
    </Card>
  );
}

export default Preview;
