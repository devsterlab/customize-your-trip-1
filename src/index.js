import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import createStore from './store';
import './app.scss';
import loadMocks from './mocks';

const store = createStore();
loadMocks(store);

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>, document.getElementById('root')
);
