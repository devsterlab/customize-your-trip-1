import * as types from '../constants/actionTypes';

const initialState = {
    hotels: [],
    hotelsLoaded: false,
    selectedHotel: '',
    days: 1
};

export default function hotel(state = initialState, action) {
    switch (action.type) {
        case types.SET_HOTELS:
            return Object.assign({}, state, {hotels: action.hotels, hotelsLoaded: true});
        case types.SELECT_HOTEL:
            return Object.assign({}, state, {selectedHotel: action.id});
        case types.SET_HOTELS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_HOTEL_DAYS:
            return Object.assign({}, state, {days: action.days});
        default:
            return state;
    }
}
