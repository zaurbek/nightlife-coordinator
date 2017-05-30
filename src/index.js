import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/WrappedApp.jsx';
import configureStore from './store/configureStore';
import initialState from './store/initialState';




const store = configureStore(initialState);

render(
  <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root')
);




