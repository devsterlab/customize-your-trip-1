import * as types from '../constants/actionTypes';

export function setHotels(hotels) {
    return { type: types.SET_HOTELS, hotels };
}