import * as types from '../constants/actionTypes';

const initialState = {
    flights: [],
    flightsLoaded: false,
    selectedFlight: ''
};

export default function flight(state = initialState, action) {
    switch (action.type) {
        case types.SET_FLIGHTS:
            return Object.assign({}, state, {flights: action.flights, flightsLoaded: true});
        case types.SELECT_FLIGHT:
            return Object.assign({}, state, {selectedFlight: action.id});
        case types.SET_FLIGHTS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        default:
            return state;
    }
}
