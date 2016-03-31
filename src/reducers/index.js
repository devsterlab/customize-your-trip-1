import { combineReducers } from 'redux';
import city from './city';
import flight from './flight';
import hotel from './hotel';
import car from './car';

const rootReducer = combineReducers({
    city, flight, hotel, car
});

export default rootReducer;

export function flightCity(state) {
    if (!state.flight.selectedFlight) return;
    let selectedFlight = state.flight.flights.find(el => el.id == state.flight.selectedFlight);
    let flightCityId = selectedFlight && selectedFlight.toCity;
    if (!flightCityId) return;
    return state.city.cities.find(el => el.id == flightCityId);
}