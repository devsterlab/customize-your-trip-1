import * as types from '../constants/actionTypes';

const initialState = {
    cars: [],
    carsLoaded: false,
    selectedCar: '',
    days: 1
};

function setCar(state, id) {
    return Object.assign({}, state, {selectedCar: id || ''});
}

function editItem(state, step) {
    return Object.assign({}, state, {
        selectedCar: step.car && step.car.id || '',
        days: step.carDays || 0
    });
}

export default function car(state = initialState, action = '') {
    switch (action.type) {
        case types.SET_CARS:
            return Object.assign({}, state, {cars: action.cars, carsLoaded: true});
        case types.SELECT_CAR:
            return setCar(state, action.id);
        case types.SET_CARS_SORT:
            return Object.assign({}, state, {sorting: {field: action.field, asc: action.asc}});
        case types.SET_CARS_FILTERS:
            return Object.assign({}, state, {filters: action.filters});
        case types.SET_CAR_DAYS:
            return Object.assign({}, state, {days: action.days});

        case types.SELECT_FLIGHT:
            return action.clearSelections && setCar(state) || state;
        case types.CONTINUE_TRIP:
            return setCar(state);
        case types.EDIT_ITEM:
            return editItem(state, action.step);
        default:
            return state;
    }
}
