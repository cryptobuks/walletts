import { div, VNode } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { StateSource } from 'cycle-onionify';
import { Button } from 'cycle-semantic-ui';
import xs, { Stream } from 'xstream';
import { BaseSinks, BaseSources } from '../../..';
import { SidebarAccountsBar } from '../../elements/sidebarAccountsBar';
import { defaultTheme, ThemeConfig } from '../../themes';
import { sidebarStyle } from './style';

export interface State {
  readonly theme: ThemeConfig;
  readonly sidebarItems: ReadonlyArray<SidebarItemProps | null>;
  readonly customSideBarHeader?: VNode;
  readonly beforeNav?: ReadonlyArray<any>;
  readonly afterNav?: ReadonlyArray<any>;
  readonly customSidebarFooter?: VNode;
}
const defaultState = {
  theme: defaultTheme,
  sidebarItems: []
};

export interface SidebarItemProps {
  readonly name: string;
  readonly icon: string;
}

export interface Sources extends BaseSources {
  readonly onion: StateSource<State>;
}
export interface Sinks extends BaseSinks {
  readonly onion: Stream<Reducer>;
}
export type Reducer = (prev?: State) => State;
const initReducer: Stream<Reducer> = xs.of(
  prev => (prev ? prev : defaultState)
);

// styles

export function Sidebar(sources: Sources): Sinks {
  const sidebarAccountsBarSinks = isolate(SidebarAccountsBar, 'sidebarItems')(
    sources
  );

  const buttonSink = Button.run({
    DOM: sources.DOM,
    props$: xs.of({ icon: true }),
    content$: xs.of('Config')
  });

  const reducer$ = xs.merge<Reducer>(
    initReducer,
    sidebarAccountsBarSinks.onion
  );
  const vdom$ = view(sidebarAccountsBarSinks.DOM, buttonSink.DOM);
  return {
    DOM: vdom$,
    onion: reducer$
  };
}

function view(
  accountsTabDOM$: Stream<VNode>,
  button$: Stream<VNode>
): Stream<VNode> {
  return xs
    .combine(accountsTabDOM$, button$)
    .map(([a, b]) => div(`.${sidebarStyle}`, {}, [a, b]));
}