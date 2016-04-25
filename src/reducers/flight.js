import * as types from '../constants/actionTypes';
import {assignArrToObj} from '../reducers';

const initialState = {
    flights: {},
    currentFlights: [],
    flightsLoaded: false,
    selectedFlight: '',
    notSearched: true
};

function setFlights(state, flights) {
    let newState = Object.assign({}, state, {flightsLoaded: true});
    assignArrToObj(newState.flights, flights);
    return newState;
}

function setSelectedFlight(state, _id) {
    return Object.assign({}, state, {selectedFlight: _id || ''});
}

function selectFlight(state, flight) {
    return Object.assign({}, state, {selectedFlight: flight && flight._id || ''});
}

function removeItem(state, itemType) {
    if (itemType != 'car') return Object.assign({}, state, {selectedFlight: ''});
    return state;
}

export default function flight(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_FLIGHTS:
            return setFlights(state, action.flights);
        case types.SET_CURRENT_FLIGHTS:
            return Object.assign({}, state, {currentFlights: action.ids});
        case types.SELECT_FLIGHT:
            return selectFlight(state, action.flight);
        case types.SET_FLIGHTS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_FLIGHTS_SEARCHED:
            return Object.assign({}, state, {notSearched: action.notSearched});

        case types.CONTINUE_TRIP:
            return Object.assign({}, setSelectedFlight(state), {notSearched: true});
        case types.EDIT_ITEM:
            return setSelectedFlight(state, action.step.flight._id);
        case types.REMOVE_ITEM:
            return removeItem(state, action.itemType);
        default:
            return state;
    }
}
