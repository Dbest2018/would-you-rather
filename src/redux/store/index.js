import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import loggerMiddleware from "../middleware/logger";
import rootReducer from "../reducers";

const configureStore = (preloadedState) => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware, loggerMiddleware);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default configureStore;
