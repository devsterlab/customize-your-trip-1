import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from './util/history';
import routes from './routes';
import createStore from './store';
import './app.scss';
import loadMocks from './util/mocks';
import Socket from './util/socket';

/*  Use Window.Perf in Console for performance debugging. Accessible only in dev mode.
    Assignment needed because window.Perf is supplied by webpack so it is not accessible from Console. */
Window.Perf = window.Perf;

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
        <Router history={history} routes={routes}/>
    </Provider>, document.getElementById('root')
);
