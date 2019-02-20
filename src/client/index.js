import "regenerator-runtime/runtime";
import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component'
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import App from '../shared';
import rootSaga from '../shared/sagas';
import reducers from '../shared/reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(
    combineReducers({
      ...reducers,
      router: connectRouter(history)
    }),
    preloadedState,
    compose(
        applyMiddleware(routerMiddleware(history), sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

// then run the saga
sagaMiddleware.run(rootSaga);

loadableReady(() => {
    hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter >
      </Provider>,
        document.getElementById('root'),
    );
});
