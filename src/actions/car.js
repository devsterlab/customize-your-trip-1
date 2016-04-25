import * as types from '../constants/actionTypes';
import * as events from '../constants/socketEvents';

export function setCars(cars) {
    return { type: types.SET_CARS, cars };
}

export function setCurrentCars(ids) {
    return { type: types.SET_CURRENT_CARS, ids };
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

export function getCars(options) {
    return {
        type: events.GET_CARS,
        socket: {
            path: events.GET_CARS,
            data: options.data,
            action: options.action,
            callback: options.callback
        }
    };
}
