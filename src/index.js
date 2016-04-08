import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import createStore from './store';
import './app.scss';
import loadMocks from './mocks';
import Socket from './util/socket';

const store = createStore();

Socket.connect(store)
    .then(() => Socket.loadCities())
    .then(() => {
        Socket.loadFlights();
        Socket.loadHotels();
        Socket.loadCars();
    })
    .then(() => console.log('Real data loaded!'))
    .catch(err => {
        loadMocks(store).then(() => console.log('Mocks loaded!'));
    });

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>, document.getElementById('root')
);
