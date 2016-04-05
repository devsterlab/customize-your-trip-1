import * as types from '../constants/actionTypes';
import DateHelper from '../util/dateHelper';

const initialState = {
    homeCity: '',
    lastCity: '',
    steps: [],
    date: new Date(),
    days: 0,
    price: 0,
    continued: false
};

function continueTrip(state, update, continued) {
    if (!(state.flight.selectedFlight && state.hotel.selectedHotel)) {
        if (!state.summary.continued) return Object.assign({}, state.summary, {steps: []});
        return state.summary;
    }

    const flight = state.flight.flights.find(el => el.id == state.flight.selectedFlight);
    const hotel = state.hotel.hotels.find(el => el.id == state.hotel.selectedHotel);
    const car = state.car.cars.find(el => el.id == state.car.selectedCar);
    const days = Math.max(state.hotel.days, state.car.days);
    const date = new Date(state.summary.date.getTime());
    const dateFrom = DateHelper.addTimeStr(DateHelper.addTimeStr(date, flight.departTime), flight.duration);
    const dateTo = DateHelper.addDays(dateFrom, days);
    const price = flight.price + state.hotel.days * hotel.price + (car && (state.car.days * car.price) || 0);
    const item = {
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

    if (update) {
        var sliced = state.summary.steps.slice(state.summary.steps.length - 1);
        var concated = sliced.concat([item]);
    }
    let summaryState = Object.assign({}, state.summary, {
        steps: update &&
            (state.summary.steps.length == 1 && [item]
                || state.summary.steps.slice(state.summary.steps.length - 1).concat([item])
            )
            || state.summary.steps.concat([item]),
        continued: state.summary.continued || continued
    });

    if (summaryState.steps.length == 1) summaryState.homeCity = flight.fromCity;
    summaryState.lastCity = flight.toCity;
    summaryState.date = dateTo;
    summaryState.days = summaryState.steps.reduce((prev, next) => prev + next.days, 0);
    summaryState.price = summaryState.steps.reduce((prev, next) => prev + next.price, 0);

    return summaryState;
}

//Caution: we are receiving the whole state but must return its summary part
export default function summary(state = initialState, action = '') {
    if (state.steps) return initialState;
    switch (action.type) {
        case types.CONTINUE_TRIP:
            return continueTrip(state, action.update, action.continued);
        default:
            return state.summary;
    }
}
