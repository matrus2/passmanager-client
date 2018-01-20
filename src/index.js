/* eslint-disable no-undef,no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import rootReducer from './reducers';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import logger from 'simple-redux-logger';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk,
    // logger({ doLogClient: true })
  ),
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// registerServiceWorker();
