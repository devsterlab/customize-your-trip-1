import * as types from '../constants/actionTypes';

export function setCities(cities) {
    return { type: types.SET_CITIES, cities };
}

export function selectCity(id, toFrom) {
    return { type: types.SELECT_CITY, id, toFrom };
}
