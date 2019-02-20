import path from 'path';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import App from '../shared';
import configureStore from './store';
import { renderHeader, renderFooter } from './template';
import rootSaga from '../shared/sagas';
const statsFile = path.resolve('./dist/loadable-stats.json')

export default async function(req, res){

    const store = configureStore();
    const loadable = new ChunkExtractor({ statsFile });

    const context = {};
    const appWithRouter = loadable.collectChunks(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    store.runSaga(rootSaga).done.then(() => {
        const helmet = Helmet.renderStatic();
        res.status(200).write(renderHeader(helmet));

        const preloadedState = store.getState();
        const htmlStream = renderToNodeStream(appWithRouter);
        htmlStream.pipe(res, { end: false });
        htmlStream.on('end', () => {
            res.write(renderFooter(loadable, preloadedState));
            return res.send();
        });
    });

    // Dispatch a close event so sagas stop listening after they're resolved
    store.close();
}
