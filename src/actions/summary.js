import * as types from '../constants/actionTypes';

export function setCurrentStep() {
    return { type: types.SET_CURRENT_STEP };
}

export function continueTrip() {
    return { type: types.CONTINUE_TRIP };
}

export function editItem(step, index, itemType) {
    return { type: types.EDIT_ITEM, step, index, itemType };
}

export function removeItem(step, index, itemType) {
    return { type: types.REMOVE_ITEM, step, index, itemType };
}

export function setConnected(connected = true) {
    return { type: types.CONNECTED, connected };
}