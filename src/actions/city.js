import * as types from '../constants/actionTypes';
import * as events from '../constants/socketEvents';

export function setCities(cities) {
    return { type: types.SET_CITIES, cities };
}

export function selectCity(_id, toFrom) {
    return { type: types.SELECT_CITY, _id, toFrom };
}

export function getCities(options) {
    return {
        type: events.GET_CITIES,
        socket: {
            path: events.GET_CITIES,
            action: options.action,
            callback: options.callback,
            data: options.data
        }
    };
}