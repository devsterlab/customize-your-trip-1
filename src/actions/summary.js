import * as types from '../constants/actionTypes';

export function continueTrip(clearSelections = true, update = false, continued = false) {
    return { type: types.CONTINUE_TRIP, clearSelections, update, continued };
}