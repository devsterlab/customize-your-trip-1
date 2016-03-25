import * as types from '../constants/actionTypes';

const initialState = {
    flights: [],
    flightsLoaded: false
};

export default function flight(state = initialState, action) {
    switch (action.type) {
        case types.SET_FLIGHTS:
            return Object.assign({}, state, {flights: action.flights, flightsLoaded: true});
        default:
            return state;
    }
}
