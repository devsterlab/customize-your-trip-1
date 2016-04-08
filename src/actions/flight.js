import * as types from '../constants/actionTypes';

export function setFlights(flights) {
    return { type: types.SET_FLIGHTS, flights };
}

export function selectFlight(_id, clearSelections) {
    return { type: types.SELECT_FLIGHT, _id, clearSelections };
}

export function setFlightsSort(field, asc) {
    return { type: types.SET_FLIGHTS_SORT, field, asc };
}

export function setFlightsSearched() {
    return { type: types.SET_FLIGHTS_SEARCHED };
}