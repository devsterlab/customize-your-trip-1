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
    let selectedFlight = state.flight.flights.find(el => el._id == state.flight.selectedFlight);
    let flightCityId = selectedFlight && selectedFlight.toCity._id;
    if (!flightCityId) return;
    return state.city.cities.find(el => el._id == flightCityId);
}