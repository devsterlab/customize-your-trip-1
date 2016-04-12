import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import createStore from './store';
import './app.scss';
import loadMocks from './mocks';
import Socket from './util/socket';

Window.Perf = window.Perf; //Use Window.Perf in Console for performance debugging. Accessible only in dev mode.

const store = createStore();

Socket.connect(store)
    .then(() => Promise.all([
        Socket.loadCities(),
        Socket.loadFlights(),
        Socket.loadHotels(),
        Socket.loadCars()
    ]))
    .then(() => {
        let state = store.getState();
        if (!state.city.cities.length || !state.flight.flights.length || !state.hotel.hotels.length) {
            loadMocks(store).then(() => console.log('Bad server data... Mocks loaded.'));
        }
        else console.log('Real data loaded!');
    })
    .catch(err => {
        loadMocks(store).then(() => console.log('Connection failed... Mocks loaded.'));
    });

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>, document.getElementById('root')
);
