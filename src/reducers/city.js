import * as types from '../constants/actionTypes';

const initialState = {
    cities: [],
    citiesLoaded: false,
    selectedCityFrom: '',
    selectedCityTo: ''
};

function resetSelectedCities(state) {
    return Object.assign({}, state, {selectedCityFrom: '', selectedCityTo: ''});
}

export default function city(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_CITIES:
            return Object.assign({}, state, {cities: action.cities, citiesLoaded: true});
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
