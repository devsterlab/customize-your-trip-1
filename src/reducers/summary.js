import * as types from '../constants/actionTypes';
import DateHelper from '../util/dateHelper';

const initialState = {
    homeCity: '',
    lastCityFrom: '',
    lastCityTo: '',
    steps: [],
    date: new Date(),
    days: 0,
    price: 0,
    currentStep: null,
    index: 0,
    connected: false
};

function getCurrentStep(state) {
    if (!state.flight.selectedFlight) return null;

    const flight = state.flight.flights[state.flight.selectedFlight];
    if (!flight || !state.hotel.selectedHotel && flight.toCity._id != state.summary.homeCity) return null;

    return calcStep(state, state.summary.date, {
        flight: state.flight.selectedFlight,
        hotel: state.hotel.selectedHotel,
        hotelDays: state.hotel.days,
        car: state.car.selectedCar,
        carDays: state.car.days
    });
}

function calcStep(state, initDate, step) {
    const flight = state.flight.flights[step.flight];
    const hotel = state.hotel.hotels[step.hotel];
    const car = state.car.cars[step.car];

    const days = Math.max(step.hotel && step.hotelDays || 0, step.car && step.carDays || 0);
    const date = DateHelper.timeZStrToDate(initDate, flight.departTime, flight.fromCity.timezone);
    const dateFrom = DateHelper.addMinutesZ(date, flight.duration, flight.toCity.timezone);
    const dateTo = DateHelper.addDays(dateFrom, days);
    const price = flight.price
        + (step.hotel && (step.hotelDays * hotel.price) || 0)
        + (step.car && (step.carDays * car.price) || 0);

    return Object.assign({}, step, {days, date, dateFrom, dateTo, price});
}

function concatStep(steps, step, index) {
    return steps
        .slice(0, index)
        .concat([step])
        .concat(steps.slice(index, steps.length));
}

function sliceStep(steps, index) {
    return steps
        .slice(0, index)
        .concat(steps.slice(index + 1, steps.length));
}

function setCurrentStep(state) {
    let summaryState = Object.assign({}, state.summary, {currentStep: getCurrentStep(state)});
    if (summaryState.currentStep)
        var steps = concatStep(summaryState.steps, summaryState.currentStep, summaryState.index);

    if (steps && steps.length) {
        recalcSteps(state, summaryState.date, steps);
        summaryState.days = calcTotalDays(summaryState.date, steps);
        summaryState.price = calcTotalPrice(steps);
    }

    return summaryState;
}

function editItem(state, step, index) {
    if (!state.summary.steps.length) return state.summary;

    let summaryState = continueTrip(state);
    const flight = state.flight.flights[step.flight];

    summaryState.currentStep = summaryState.steps[index];
    summaryState.steps = sliceStep(summaryState.steps, index);
    summaryState.index = index;
    summaryState.lastCityFrom = flight.fromCity._id;
    summaryState.lastCityTo = summaryState.steps.length != index && flight.toCity._id || '';
    return summaryState;
}

function removeItem(state, step, index, itemType) {
    let summaryState = Object.assign({}, state.summary);
    const flight = state.flight.flights[step.flight];

    if (itemType == 'flight' || (itemType == 'hotel' &&
        !(flight.toCity._id == summaryState.homeCity && index == summaryState.steps.length))) {
        if (index == 0) return Object.assign({}, initialState, {connected: true});
        if (summaryState.currentStep)
            summaryState.steps = concatStep(summaryState.steps, summaryState.currentStep, summaryState.index);
        summaryState.steps = summaryState.steps.slice(0, index);
        updateSummary(state, summaryState);
    }
    else {
        let steps = summaryState.currentStep ?
            concatStep(summaryState.steps, summaryState.currentStep, summaryState.index)
            : summaryState.steps;
        steps[index][itemType] = null;
        if (itemType == 'hotel') {
            steps[index].car = null;
        }
        recalcSteps(state, summaryState.date, steps);
        summaryState.days = calcTotalDays(summaryState.date, steps);
        summaryState.price = calcTotalPrice(steps);
    }
    return summaryState;
}

function continueTrip(state) {
    let step = state.summary.currentStep;
    if (!step) return state.summary;

    let summaryState = Object.assign({}, state.summary, {
        steps: concatStep(state.summary.steps, step, state.summary.index)
    });

    return updateSummary(state, summaryState);
}

function updateSummary(state, summaryState) {
    recalcSteps(state, summaryState.date, summaryState.steps);

    summaryState.homeCity = state.flight.flights[summaryState.steps[0].flight].fromCity._id;
    summaryState.lastCityFrom = state.flight.flights[summaryState.steps[summaryState.steps.length - 1].flight].toCity._id;
    summaryState.lastCityTo = '';
    summaryState.days = calcTotalDays(summaryState.date, summaryState.steps);
    summaryState.price = calcTotalPrice(summaryState.steps);
    summaryState.index = summaryState.steps.length;
    summaryState.currentStep = null;
    return summaryState;
}

function calcTotalDays(initDate, steps) {
    return DateHelper.subDays(initDate, steps[steps.length - 1].dateTo);
}

function calcTotalPrice(steps) {
    return steps.reduce((prev, next) => prev + next.price, 0);
}

function recalcSteps(state, initDate, steps) {
    steps[0] = calcStep(state, initDate, steps[0]);
    for (let i = 1; i < steps.length; i++) {
        Object.assign(steps[i], calcStep(state, steps[i - 1].dateTo, steps[i]));
    }
}

//Caution: we are receiving the whole state but must return its summary part
export default function summary(state = initialState, action = '') {
    if (state.steps) return initialState;
    switch (action.type) {
        case types.CONTINUE_TRIP:
            return continueTrip(state);
        case types.SET_CURRENT_STEP:
            return setCurrentStep(state);
        case types.EDIT_ITEM:
            return editItem(state, action.step, action.index);
        case types.REMOVE_ITEM:
            return removeItem(state, action.step, action.index, action.itemType);
        case types.CONNECTED:
            return Object.assign({}, state.summary, {connected: action.connected});
        default:
            return state.summary || initialState;
    }
}
