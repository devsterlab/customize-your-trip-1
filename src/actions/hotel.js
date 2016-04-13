import * as types from '../constants/actionTypes';
import * as events from '../constants/socketEvents';

export function setHotels(hotels) {
    return { type: types.SET_HOTELS, hotels };
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

export function getAllHotels() {
    return {
        type: events.GET_ALL_HOTELS,
        socket: {
            path: events.GET_ALL_HOTELS,
            action: setHotels
        }
    };
}
