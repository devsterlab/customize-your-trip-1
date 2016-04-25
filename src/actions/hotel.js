import * as types from '../constants/actionTypes';
import * as events from '../constants/socketEvents';

export function setHotels(hotels) {
    return { type: types.SET_HOTELS, hotels };
}

export function setCurrentHotels(ids) {
    return { type: types.SET_CURRENT_HOTELS, ids };
}

export function selectHotel(_id) {
    return { type: types.SELECT_HOTEL, _id };
}

export function setHotelsSort(field, asc) {
    return { type: types.SET_HOTELS_SORT, field, asc };
}

export function setHotelDays(days) {
    return { type: types.SET_HOTEL_DAYS, days };
}

export function getHotels(options) {
    return {
        type: events.GET_HOTELS,
        socket: {
            path: events.GET_HOTELS,
            data: options.data,
            action: options.action,
            callback: options.callback
        }
    };
}

export function getCityHotels(cityId, sorting) {
    return {
        type: events.GET_HOTELS,
        socket: {
            path: events.GET_HOTELS,
            data: {
                search: {"city._id": cityId},
                sort: {[sorting.field]: sorting.asc ? 1 : -1}
            },
            action: [setHotels, hotels => setCurrentHotels(hotels.map(h => h._id))]
        }
    };
}