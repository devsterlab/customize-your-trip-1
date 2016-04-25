import * as types from '../constants/actionTypes';
import * as events from '../constants/socketEvents';

export function setFlights(flights) {
    return { type: types.SET_FLIGHTS, flights };
}

export function setCurrentFlights(ids) {
    return { type: types.SET_CURRENT_FLIGHTS, ids };
}

export function selectFlight(flight, clearSelections) {
    return { type: types.SELECT_FLIGHT, flight, clearSelections };
}

export function setFlightsSort(field, asc) {
    return { type: types.SET_FLIGHTS_SORT, field, asc };
}

export function setFlightsNotSearched(notSearched = false) {
    return { type: types.SET_FLIGHTS_SEARCHED, notSearched };
}

export function getFlights(options) {
    return {
        type: events.GET_FLIGHTS,
        socket: {
            path: events.GET_FLIGHTS,
            data: options.data,
            action: options.action,
            callback: options.callback
        }
    };
}

export function getCurrentFlights(selectedCityFrom, selectedCityTo, sorting) {
    return {
        type: events.GET_FLIGHTS,
        socket: {
            path: events.GET_FLIGHTS,
            data: {
                search: {"fromCity._id": selectedCityFrom, "toCity._id": selectedCityTo},
                sort: {[sorting.field]: sorting.asc ? 1 : -1}
            },
            action: [setFlights, flights => setCurrentFlights(flights.map(fl => fl._id))]
        }
    };
}