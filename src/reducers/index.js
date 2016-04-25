import { combineReducers } from 'redux';
import city from './city';
import flight from './flight';
import hotel from './hotel';
import car from './car';
import summary from './summary';

const main = combineReducers({
    city, flight, hotel, car, summary //summary here is needed because of combineReducers registering
});

export default function rootReducer(state, action) {
    return Object.assign({}, main(state, action), {
        summary: summary(state, action)
    });
}

export function flightCity(state) {
    if (!state.flight.selectedFlight) return;
    let currentFlight = state.flight.flights[state.flight.selectedFlight];
    if (!currentFlight) return;
    return state.city.cities[currentFlight.toCity._id];
}

export function assignArrToObj(obj, arr, field = '_id') {
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        obj[el[field]] = Object.assign({}, obj[el[field]], el);
    }
}