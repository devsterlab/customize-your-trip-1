import * as types from '../constants/actionTypes';

export function setCars(cars) {
    return { type: types.SET_CARS, cars };
}