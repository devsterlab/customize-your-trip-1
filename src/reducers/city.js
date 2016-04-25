import * as types from '../constants/actionTypes';
import {assignArrToObj} from '../reducers';

const initialState = {
    cities: {},
    citiesLoaded: false,
    selectedCityFrom: '',
    selectedCityTo: ''
};

function setCities(state, cities) {
    let newState = Object.assign({}, state, {citiesLoaded: true});
    assignArrToObj(newState.cities, cities);
    return newState;
}

function resetSelectedCities(state) {
    return Object.assign({}, state, {selectedCityFrom: '', selectedCityTo: ''});
}

export default function city(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_CITIES:
            return setCities(state, action.cities);
        case types.SELECT_CITY:
            return Object.assign({}, state, {['selectedCity' + action.toFrom]: action._id});

        case types.CONTINUE_TRIP:
            return resetSelectedCities(state);
        case types.REMOVE_ITEM:
            return action.itemType != 'car' && resetSelectedCities(state) || state;
        default:
            return state;
    }
}
