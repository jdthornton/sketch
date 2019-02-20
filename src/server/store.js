import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createMemoryHistory from 'history/createMemoryHistory';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import reducers from '../shared/reducers';

const sagaMiddleware = createSagaMiddleware();
const history = createMemoryHistory();

const reduxMiddlewares = [
    routerMiddleware(history),
    sagaMiddleware,
];

export default (initialState) => {
    const store = createStore(
        combineReducers({
          ...reducers,
          router: connectRouter(history)
        }),
        initialState,
        compose(applyMiddleware(...reduxMiddlewares)),
    );

    store.runSaga = sagaMiddleware.run;

    store.close = () => store.dispatch(END);

    return store;
};
