import * as types from '../constants/actionTypes';

export function setCars(cars) {
    return { type: types.SET_CARS, cars };
}

export function selectCar(_id) {
    return { type: types.SELECT_CAR, _id };
}

export function setCarsSort(field, asc) {
    return { type: types.SET_CARS_SORT, field, asc };
}

export function setCarsFilters(filters) {
    return { type: types.SET_CARS_FILTERS, filters };
}

export function setCarDays(days) {
    return { type: types.SET_CAR_DAYS, days };
}