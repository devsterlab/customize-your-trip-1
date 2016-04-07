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
    continued: false,
    currentStep: null,
    index: 0
};

function getCurrentStep(state) {
    if (!state.flight.selectedFlight) return null;

    const flight = state.flight.flights.find(el => el.id == state.flight.selectedFlight);

    if (!state.hotel.selectedHotel && flight.toCity.id != state.summary.homeCity) return null;

    const hotel = state.hotel.selectedHotel && state.hotel.hotels.find(el => el.id == state.hotel.selectedHotel);
    const car = state.car.cars.find(el => el.id == state.car.selectedCar);

    return calcStep(state.summary.date, {
        flight,
        hotel,
        hotelDays: state.hotel.days,
        car,
        carDays: state.car.days
    });
}

function calcStep(initDate, step) {
    const days = Math.max(step.hotel && step.hotelDays || 0, step.car && step.carDays || 0);
    const date = DateHelper.timeZStrToDate(initDate, step.flight.departTime, step.flight.fromCity.timezone);
    const dateFrom = DateHelper.addTimeStr(date, step.flight.duration);
    const dateTo = DateHelper.addDays(dateFrom, days);
    const price = step.flight.price
        + (step.hotel && (step.hotelDays * step.hotel.price) || 0)
        + (step.car && (step.carDays * step.car.price) || 0);

    return Object.assign({}, step, {days, date, dateFrom, dateTo, price});
}

function concatCurrentStep(steps, step, index) {
    return steps
        .slice(0, index)
        .concat([step])
        .concat(steps.slice(index, steps.length));
}

function setCurrentStep(state) {
    let summaryState = Object.assign({}, state.summary, {currentStep: getCurrentStep(state)});
    if (summaryState.currentStep)
        var steps = concatCurrentStep(summaryState.steps, summaryState.currentStep, summaryState.index);

    if (steps && steps.length) {
        recalcSteps(summaryState.date, steps);
        summaryState.days = calcTotalDays(summaryState.date, steps);
        summaryState.price = calcTotalPrice(steps);
    }

    return summaryState;
}

function editItem(state, step, index) {
    if (!state.summary.steps.length) return state.summary;
    let summaryState = continueTrip(state);
    summaryState.currentStep = summaryState.steps[index];
    summaryState.steps = summaryState.steps
        .slice(0, index)
        .concat(summaryState.steps.slice(index + 1, summaryState.steps.length));
    summaryState.index = index;
    summaryState.lastCityFrom = step.flight.fromCity.id;
    summaryState.lastCityTo = summaryState.steps.length != index && step.flight.toCity.id || '';
    return summaryState;
}

function removeItem(state, index, itemType) {

}

function continueTrip(state) {
    let step = getCurrentStep(state);
    if (!step) return state.summary;

    let summaryState = Object.assign({}, state.summary, {
        steps: concatCurrentStep(state.summary.steps, step, state.summary.index)
    });
    recalcSteps(summaryState.date, summaryState.steps);
    summaryState.homeCity = summaryState.steps[0].flight.fromCity.id;
    summaryState.lastCityFrom = summaryState.steps[summaryState.steps.length - 1].flight.toCity.id;
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

function recalcSteps(initDate, steps) {
    steps[0] = calcStep(initDate, steps[0]);
    for (let i = 1; i < steps.length; i++) {
        Object.assign(steps[i], calcStep(steps[i - 1].dateTo, steps[i]));
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
        default:
            return state.summary;
    }
}
