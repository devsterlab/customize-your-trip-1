import * as types from '../constants/actionTypes';

export function setCurrentStep() {
    return { type: types.SET_CURRENT_STEP };
}

export function continueTrip() {
    return { type: types.CONTINUE_TRIP };
}