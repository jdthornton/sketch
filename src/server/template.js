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
            <style>
              html, body, #root {
                height: 100%
              }
              body {
                margin: 0;
              }
              ul {
                  list-style: none;
                  margin: 0;
                  padding: 0;
              }
              a {
                text-decoration: none;
              }
              a:hover {
                text-decoration: none;
              }
              input:focus {
                  outline: none;
              }
              #root {
                font-size: 14px;
                font-family: sans-serif;
                letter-spacing: 0.5px;
                display: flex;
                flex-direction: column;
                margin: 0;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                overflow: hidden;
              }

              a {
                color: black;
              }

              header {
                z-index: 3000;
                position: fixed;
                top: 0;
                width: 100%;
                padding: 0 12px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: row-reverse;
                height: 55px;
                color: #555;
                overflow: hidden;
              }


              .container {
                display: flex;
                flex-grow: 1;
                flex-direction: column-reverse;
              }

              aside {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                border-right: 1px solid #ddd;
                border-top: 1px solid #bbb;
              }

              h1,h2,h3,h4,h5 {
                margin: 0;
                text-transform: capitalize;
                color: var(--text-color);
                white-space: nowrap;
              }
              .button {
                padding: 6px;
                border-radius: 50%;
                box-shadow: 0 1px 3px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.28);
                cursor: pointer;
                position: relative;
                z-index: 10000;
                background: linear-gradient(135deg, #87e0fd 0%,#53cbf1 40%,#ce06cb 100%);
              }
              header.baseHeader {
                background-color: #fffafa;
                box-shadow: 0 1px 5px rgba(0,0,0,0.16), 0 1px 5px rgba(0,0,0,0.23);
                flex-direction: row ;
                z-index: 2999;
                width: 100%;
                position: relative;
              }
              .button > svg {
                width: 26px;
                height: 26px;
                fill: #fff;
              }

              @media (min-width: 1024px),
                (min-width: 768px) AND (orientation: portrait){
                header {
                  height: 95px;
                }
                .button {
                  padding: 9px;
                }
                .button > svg {
                  width: 38px;
                  height: 38px;
                }
              }

              @media (min-width: 1025px){
                .container {
                  flex-direction: row;
                }
                aside {
                  border-top: none;
                }
                .button > svg {
                  width: 46px;
                  height: 46px;
                }
                .button {
                  padding: 11px;
                }
              }
              @media (min-width: 1336px){
                header {
                  height: 55px;
                  padding: 0 24px;
                }
                .button > svg {
                  width: 28px;
                  height: 28px;
                }
                .button {
                  padding: 6px;
                }
              }
              @media (min-width: 1440px){
                header {
                  height: 7.5vh;
                }
              }
              @media (max-width: 900px) and (orientation : landscape){
                .baseHeader > svg { width: 20px; height: 20px; }
                .button { padding: 4px; }
              }
              @media only screen
                and (min-device-width: 1024px)
                and (max-device-width: 1366px)
                and (orientation: landscape)
                and (-webkit-min-device-pixel-ratio: 1.5) {
                  .container {
                    flex-direction: row;
                  }
              }
            </style>
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
