import * as types from '../constants/actionTypes';

const initialState = {
    hotels: [],
    hotelsLoaded: false,
    selectedHotel: '',
    days: 1
};

function setHotel(state, id) {
    return Object.assign({}, state, {selectedHotel: id || ''});
}

export default function hotel(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_HOTELS:
            return Object.assign({}, state, {hotels: action.hotels, hotelsLoaded: true});
        case types.SELECT_HOTEL:
            return setHotel(state, action.id);
        case types.SET_HOTELS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_HOTEL_DAYS:
            return Object.assign({}, state, {days: action.days});

        case types.SELECT_FLIGHT:
            return setHotel(state);
        case types.CONTINUE_TRIP:
            return action.clearSelections && setHotel(state) || state;
        default:
            return state;
    }
}
