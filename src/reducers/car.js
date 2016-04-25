import * as types from '../constants/actionTypes';
import {assignArrToObj} from '../reducers';

const initialState = {
    cars: {},
    currentCars: [],
    carsLoaded: false,
    selectedCar: '',
    days: 1
};

function setCars(state, cars) {
    let newState = Object.assign({}, state, {carsLoaded: true});
    assignArrToObj(newState.cars, cars);
    return newState;
}

function setSelectedCar(state, _id) {
    return Object.assign({}, state, {selectedCar: _id || ''});
}

function editItem(state, step) {
    return Object.assign({}, state, {
        selectedCar: step.car && step.car._id || '',
        days: step.carDays || 0
    });
}

export default function car(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_CARS:
            return setCars(state, action.cars);
        case types.SELECT_CAR:
            return setSelectedCar(state, action._id);
        case types.SET_CARS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_CARS_FILTERS:
            return Object.assign({}, state, {filters: action.filters});
        case types.SET_CAR_DAYS:
            return Object.assign({}, state, {days: action.days});

        case types.SELECT_FLIGHT:
            return action.clearSelections && setSelectedCar(state) || state;
        case types.CONTINUE_TRIP:
            return setSelectedCar(state);
        case types.EDIT_ITEM:
            return editItem(state, action.step);
        case types.REMOVE_ITEM:
            return setSelectedCar(state);
        default:
            return state;
    }
}
