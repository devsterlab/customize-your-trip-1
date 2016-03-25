import * as types from '../constants/actionTypes';

export function setFlights(flights) {
    return { type: types.SET_FLIGHTS, flights };
}