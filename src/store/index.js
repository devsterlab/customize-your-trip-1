import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

function deserialize(stateString) {
    let state = JSON.parse(stateString);

    if (state.summary) {
        if (state.summary.date) state.summary.date = new Date(state.summary.date);
        if (state.summary.currentStep) {
            state.summary.currentStep.date = new Date(state.summary.currentStep.date);
            state.summary.currentStep.dateFrom = new Date(state.summary.currentStep.dateFrom);
            state.summary.currentStep.dateTo = new Date(state.summary.currentStep.dateTo);
        }
        for (let step of state.summary.steps) {
            step.date = new Date(step.date);
            step.dateFrom = new Date(step.dateFrom);
            step.dateTo = new Date(step.dateTo);
        }
    }

    if (state.city) state.city.cities = [];
    if (state.flight) state.flight.flights = [];
    if (state.hotel) state.hotel.hotels = [];
    if (state.car) state.car.cars = [];

    return state;
}

const createPersistentStore = compose(
    applyMiddleware(thunk),
    persistState(null, {key: 'customizeTrip', deserialize}),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    return createPersistentStore(rootReducer, initialState);
}
