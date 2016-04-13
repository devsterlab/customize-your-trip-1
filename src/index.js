import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './util/history';
import routes from './routes';
import createStore from './store';
import './app.scss';

/*  Use Window.Perf in Console for performance debugging. Accessible only in dev mode.
    Assignment needed because window.Perf is supplied by webpack so it is not accessible from Console. */
Window.Perf = window.Perf;

const store = createStore();

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>, document.getElementById('root')
);
