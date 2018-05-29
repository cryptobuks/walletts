import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

export = {
  history,
  configureStore(initialState: Object | void) {
    return createStore(rootReducer as Reducer<any>, initialState, enhancer);
  }
};
