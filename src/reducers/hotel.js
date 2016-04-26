import * as types from '../constants/actionTypes';
import {assignArrToObj} from '../reducers';

const initialState = {
    hotels: {},
    currentHotels: [],
    hotelsLoaded: false,
    selectedHotel: '',
    days: 1
};

function setHotels(state, hotels) {
    let newState = Object.assign({}, state, {hotelsLoaded: true});
    assignArrToObj(newState.hotels, hotels);
    return newState;
}

function setSelectedHotel(state, _id) {
    return Object.assign({}, state, {selectedHotel: _id || ''});
}

function selectFlight(state, clearSelections) {
    return clearSelections
        && Object.assign({}, state, {selectedHotel: '', currentHotels: []})
        || state;
}

function editItem(state, step) {
    return Object.assign({}, state, {
        selectedHotel: step.hotel && step.hotel._id || '',
        days: step.hotelDays || 0
    });
}

function removeItem(state, itemType) {
    if (itemType != 'car') return Object.assign({}, state, {selectedHotel: ''});
    return state;
}

export default function hotel(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_HOTELS:
            return setHotels(state, action.hotels);
        case types.SET_CURRENT_HOTELS:
            return Object.assign({}, state, {currentHotels: action.ids});
        case types.SELECT_HOTEL:
            return setSelectedHotel(state, action._id);
        case types.SET_HOTELS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_HOTEL_DAYS:
            return Object.assign({}, state, {days: action.days});

        case types.SELECT_FLIGHT:
            return selectFlight(state, action.clearSelections);
        case types.CONTINUE_TRIP:
            return setSelectedHotel(state);
        case types.EDIT_ITEM:
            return editItem(state, action.step);
        case types.REMOVE_ITEM:
            return removeItem(state, action.itemType);
        default:
            return state;
    }
}
