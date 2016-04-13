import * as types from '../constants/actionTypes';
import * as events from '../constants/socketEvents';

export function setFlights(flights) {
    return { type: types.SET_FLIGHTS, flights };
}

export function selectFlight(_id, clearSelections) {
    return { type: types.SELECT_FLIGHT, _id, clearSelections };
}

export function setFlightsSort(field, asc) {
    return { type: types.SET_FLIGHTS_SORT, field, asc };
}

export function setFlightsSearched(notSearched = false) {
    return { type: types.SET_FLIGHTS_SEARCHED, notSearched };
}

export function getAllFlights() {
    return {
        type: events.GET_ALL_FLIGHTS,
        socket: {
            path: events.GET_ALL_FLIGHTS,
            action: setFlights
        }
    };
}
