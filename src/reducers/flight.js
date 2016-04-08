import * as types from '../constants/actionTypes';

const initialState = {
    flights: [],
    flightsLoaded: false,
    selectedFlight: '',
    notSearched: true
};

function setFlight(state, _id) {
    return Object.assign({}, state, {selectedFlight: _id || ''});
}

export default function flight(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_FLIGHTS:
            return Object.assign({}, state, {flights: action.flights, flightsLoaded: true});
        case types.SELECT_FLIGHT:
            return setFlight(state, action._id);
        case types.SET_FLIGHTS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_FLIGHTS_SEARCHED:
            return Object.assign({}, state, {notSearched: false});

        case types.CONTINUE_TRIP:
            return Object.assign({}, setFlight(state), {notSearched: true});
        case types.EDIT_ITEM:
            return setFlight(state, action.step.flight._id);
        default:
            return state;
    }
}
