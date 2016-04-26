import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import {setConnected} from '../actions/summary';
import persistState from 'redux-localstorage';
import socketMiddleware from '../middleware/socket';
import loadMocks from '../util/mocks';

const createPersistentStore = compose(
    persistState(null, {key: 'customizeTrip', deserialize, slicer}),
    applyMiddleware(socketMiddleware(onSocketError)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    return createPersistentStore(rootReducer, initialState);
}

let mocksLoadStart = false;
function onSocketError(err, store) {
    console.log('Socket error: ' + err);
    if (!mocksLoadStart) {
        mocksLoadStart = true;
        store.dispatch(setConnected(false));
        //loadMocks(store).then(() => console.log('Mocks loaded.'));
    }
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
            delete state.summary.connected;
        }

        state.city = {
            selectedCityFrom: state.selectedCityFrom,
            selectedCityTo: state.selectedCityTo,
            cities: {}
        };
        state.flight = {
            selectedFlight: state.selectedFlight,
            sorting: state.sortingFlights,
            flights: {},
            currentFlights: []
        };
        state.hotel = {
            selectedHotel: state.selectedHotel,
            days: state.hotelDays,
            sorting: state.sortingHotels,
            hotels: {},
            currentHotels: []
        };
        state.car = {
            selectedCar: state.selectedCar,
            days: state.carDays,
            sorting: state.sortingCars,
            filters: state.carsFilters,
            cars: {},
            currentCars: []
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
