import { combineReducers } from 'redux';
import city from './city';
import flight from './flight';
import hotel from './hotel';
import car from './car';

const rootReducer = combineReducers({
    city, flight, hotel, car
});

export default rootReducer;
