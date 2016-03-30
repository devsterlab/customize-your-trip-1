import * as types from '../constants/actionTypes';

export function setHotels(hotels) {
    return { type: types.SET_HOTELS, hotels };
}

export function selectHotel(id) {
    return { type: types.SELECT_HOTEL, id };
}

export function setHotelsSort(field, asc) {
    return { type: types.SET_HOTELS_SORT, field, asc };
}

export function setHotelDays(days) {
    return { type: types.SET_HOTEL_DAYS, days };
}