import * as types from '../constants/actionTypes';

const initialState = {
    hotels: [],
    hotelsLoaded: false
};

export default function hotel(state = initialState, action) {
    switch (action.type) {
        case types.SET_HOTELS:
            return Object.assign({}, state, {hotels: action.hotels, hotelsLoaded: true});
        default:
            return state;
    }
}
