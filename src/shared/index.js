import React from 'react';
import { Route, Link } from 'react-router-dom';
import loadable from '@loadable/component';
import Helmet from 'react-helmet';

import SocketWrapper from './containers/SocketWrapper';

import styles from './index.css';

const App = () =>
  <React.Fragment>
    <Helmet
        htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
        titleTemplate="%s | Sketch"
        titleAttributes={{ itemprop: 'name', lang: 'en' }}
        meta={[
            { name: 'description', content: 'Online pictionary application' },
            { name: "author", content: "Jake Thornton" },
            { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { name: "apple-mobile-web-app-capable", content: "yes"},
            { name: "mobile-web-app-capable", content: "yes"}
        ]}
    />
    <header className={styles.baseHeader}>
      <Link to="/" className={styles.button}>
      <svg enable-background="new 0 0 512 512" viewBox="0 0 512 512"  ><g id="Layer_8"><g><path d="M423.142,11.872C400.406,36.541,265.549,264.51,211.478,330.963c-27.055,33.241-7.78,54.27-7.78,54.27    c9.553-0.547,21.199,12.052,21.199,12.052c18.671-0.793,42.557-35.664,80.041-121.676    C355.284,160.036,433.448,16.026,433.448,16.026C437.938,1.815,423.142,11.872,423.142,11.872z"/><path d="M146.033,434.721c-22.306,58.976-68.862,48.658-68.325,52.035c2.527,15.955,60.38,23.886,90.339,11.269    c36.753-15.475,41.902-48.611,39.356-64.586C204.876,417.483,161.22,394.587,146.033,434.721z"/><path d="M218.182,420.718c-3.272,5.63-8.968,8.458-12.703,6.279l-19.746-11.476c-3.734-2.169-4.111-8.497-0.849-14.126    l7.412-12.777c3.263-5.63,8.958-8.44,12.702-6.271l19.756,11.466c3.734,2.169,4.111,8.507,0.83,14.126L218.182,420.718z"/></g></g></svg>
      </Link>
    </header>
    <div className={styles.container}>
      <Route component={SocketWrapper} />
    </div>
  </React.Fragment>

export default App;
