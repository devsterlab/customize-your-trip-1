import * as types from '../constants/actionTypes';

const initialState = {
    cars: [],
    carsLoaded: false
};

export default function car(state = initialState, action) {
    switch (action.type) {
        case types.SET_CARS:
            return Object.assign({}, state, {cars: action.cars, carsLoaded: true});
        default:
            return state;
    }
}
