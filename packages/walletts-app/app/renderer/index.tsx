import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Root } from "./containers/Root";
import "./app.global.scss";
import { defaultState } from "./store";

const { configureStore, history } = require("./store/configureStore");
const store = configureStore(defaultState);
console.log("state is");
console.log(store.getState());

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("root")
);

if ((module as any).hot) {
  (module as any).hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root").default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
