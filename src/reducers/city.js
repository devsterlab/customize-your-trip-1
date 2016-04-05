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
            return action.clearSelections && Object.assign({}, state, {selectedCityFrom: '', selectedCityTo: ''})
                || state;
        default:
            return state;
    }
}
