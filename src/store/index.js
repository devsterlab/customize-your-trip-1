import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

const createPersistentStore = compose(
    applyMiddleware(thunk),
    persistState(null, {key: 'customizeTrip', deserialize, slicer}),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    return createPersistentStore(rootReducer, initialState);
}

function deserialize(stateString) {
    let state = JSON.parse(stateString);

    if (state) {
        if (state.summary) {
            if (state.summary.date) state.summary.date = new Date(state.summary.date);
            if (state.summary.currentStep) {
                state.summary.currentStep.date = new Date(state.summary.currentStep.date);
                state.summary.currentStep.dateFrom = new Date(state.summary.currentStep.dateFrom);
                state.summary.currentStep.dateTo = new Date(state.summary.currentStep.dateTo);
            }
            for (let step of state.summary.steps) {
                step.date = new Date(step.date);
                step.dateFrom = new Date(step.dateFrom);
                step.dateTo = new Date(step.dateTo);
            }
        }

        state.city = {
            selectedCityFrom: state.selectedCityFrom,
            selectedCityTo: state.selectedCityTo,
            cities: []
        };
        state.flight = {
            selectedFlight: state.selectedFlight,
            sorting: state.sortingFlights,
            flights: []
        };
        state.hotel = {
            selectedHotel: state.selectedHotel,
            days: state.hotelDays,
            sorting: state.sortingHotels,
            hotels: []
        };
        state.car = {
            selectedCar: state.selectedCar,
            days: state.carDays,
            sorting: state.sortingCars,
            filters: state.carsFilters,
            cars: []
        };

        delete state.selectedCityFrom;
        delete state.selectedCityTo;
        delete state.selectedFlight;
        delete state.sortingFlights;
        delete state.selectedHotel;
        delete state.hotelDays;
        delete state.sortingHotels;
        delete state.selectedCar;
        delete state.carDays;
        delete state.sortingCars;
        delete state.carsFilters;
    }

    return state;
}

function slicer() {
    return (state) => {
        let subset = {
            selectedCityFrom: state.city.selectedCityFrom,
            selectedCityTo: state.city.selectedCityTo,
            selectedFlight: state.flight.selectedFlight,
            sortingFlights: state.flight.sorting,
            selectedHotel: state.hotel.selectedHotel,
            hotelDays: state.hotel.days,
            sortingHotels: state.hotel.sorting,
            selectedCar: state.car.selectedCar,
            carDays: state.car.days,
            sortingCars: state.car.sorting,
            carsFilters: state.car.filters,
            summary: state.summary
        };

        return subset;
    };
}
