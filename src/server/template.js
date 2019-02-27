export const renderHeader = (helmet) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json">
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">
`;

export const renderFooter = (loadable, preloadedState) => `
            </div>
            <script>
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script>
            (function() {
              if('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/serviceWorker.js');
              }
            })();
            </script>
            ${loadable.getScriptTags()}
            ${loadable.getStyleTags()}
            <noscript>Your browser does not support JavaScript!</noscript>
        </body>
    </html>

`;
