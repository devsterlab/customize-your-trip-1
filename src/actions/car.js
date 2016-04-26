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

export function getCityCars(cityId, sorting, filters) {
    if (filters.transmission) {
        filters = Object.assign({}, filters);
        if (filters.transmission.automatic == filters.transmission.manual)
            delete filters.transmission;
        else if (filters.transmission.automatic) filters.transmission = 'automatic';
        else filters.transmission = 'manual';
    }
    return {
        type: events.GET_CARS,
        socket: {
            path: events.GET_CARS,
            data: {
                search: Object.assign({"city._id": cityId}, filters),
                sort: {[sorting.field]: sorting.asc ? 1 : -1}
            },
            action: [setCars, hotels => setCurrentCars(hotels.map(h => h._id))]
        }
    };
}