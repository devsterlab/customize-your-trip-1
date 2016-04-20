import * as types from '../constants/actionTypes';

const initialState = {
    flights: [],
    flightsLoaded: false,
    selectedFlight: '',
    flightCity: '',
    notSearched: true
};

function setFlight(state, _id) {
    return Object.assign({}, state, {selectedFlight: _id || ''});
}

function selectFlight(state, flight) {
    return Object.assign({}, state, {
        selectedFlight: flight && flight._id || '',
        flightCity: flight && flight.toCity._id || ''
    });
}

function removeItem(state, itemType) {
    if (itemType != 'car') return Object.assign({}, state, {selectedFlight: ''});
    return state;
}

export default function flight(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_FLIGHTS:
            return Object.assign({}, state, {flights: action.flights, flightsLoaded: true});
        case types.SELECT_FLIGHT:
            return selectFlight(state, action.flight);
        case types.SET_FLIGHTS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_FLIGHTS_SEARCHED:
            return Object.assign({}, state, {notSearched: action.notSearched});

        case types.CONTINUE_TRIP:
            return Object.assign({}, setFlight(state), {notSearched: true});
        case types.EDIT_ITEM:
            return setFlight(state, action.step.flight._id);
        case types.REMOVE_ITEM:
            return removeItem(state, action.itemType);
        default:
            return state;
    }
}
