import * as types from '../constants/actionTypes';
import DateHelper from '../util/dateHelper';

const initialState = {
    homeCity: '',
    lastCity: '',
    steps: [],
    date: new Date(),
    days: 0,
    price: 0,
    continued: false,
    currentStep: null
};

function getCurrentStep(state) {
    if (!state.flight.selectedFlight) return null;

    const flight = state.flight.flights.find(el => el.id == state.flight.selectedFlight);

    if (!state.hotel.selectedHotel && flight.toCity.id != state.summary.homeCity) return null;

    const hotel = state.hotel.selectedHotel && state.hotel.hotels.find(el => el.id == state.hotel.selectedHotel);
    const car = state.car.cars.find(el => el.id == state.car.selectedCar);
    const days = Math.max(hotel && state.hotel.days || 0, car && state.car.days || 0);
    const date = DateHelper.timeZStrToDate(state.summary.date, flight.departTime, flight.fromCity.timezone);
    const dateFrom = DateHelper.addTimeStr(date, flight.duration);
    const dateTo = DateHelper.addDays(dateFrom, days);
    const price = flight.price
        + (hotel && (state.hotel.days * hotel.price) || 0)
        + (car && (state.car.days * car.price) || 0);

    return {
        flight,
        hotel,
        hotelDays: state.hotel.days,
        car,
        carDays: state.car.days,
        date,
        dateFrom,
        dateTo,
        days,
        price
    };
}

function setCurrentStep(state) {
    return Object.assign({}, state.summary, {currentStep: getCurrentStep(state)});
}

function continueTrip(state) {
    let step = getCurrentStep(state);
    if (!step) return state.summary;

    let summaryState = Object.assign({}, state.summary, {
        steps: state.summary.steps.concat([step])
    });

    if (summaryState.steps.length == 1) summaryState.homeCity = step.flight.fromCity.id;
    summaryState.lastCity = step.flight.toCity.id;
    summaryState.date = step.dateTo;
    summaryState.days = summaryState.steps.reduce((prev, next) => prev + next.days, 0);
    summaryState.price = summaryState.steps.reduce((prev, next) => prev + next.price, 0);

    return summaryState;
}

//Caution: we are receiving the whole state but must return its summary part
export default function summary(state = initialState, action = '') {
    if (state.steps) return initialState;
    switch (action.type) {
        case types.CONTINUE_TRIP:
            return continueTrip(state);
        case types.SET_CURRENT_STEP:
            return setCurrentStep(state);
        default:
            return state.summary;
    }
}
