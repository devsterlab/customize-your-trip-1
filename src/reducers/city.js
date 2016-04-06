import * as types from '../constants/actionTypes';

const initialState = {
    cities: [],
    citiesLoaded: false,
    selectedCityFrom: '',
    selectedCityTo: ''
};

export default function city(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_CITIES:
            return Object.assign({}, state, {cities: action.cities, citiesLoaded: true});
        case types.SELECT_CITY:
            return Object.assign({}, state, {['selectedCity' + action.toFrom]: action.id});

        case types.CONTINUE_TRIP:
            return Object.assign({}, state, {selectedCityFrom: '', selectedCityTo: ''});
        default:
            return state;
    }
}
