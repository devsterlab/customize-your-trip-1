import { combineReducers } from 'redux';
import flight from './flight';
import hotel from './hotel';

const rootReducer = combineReducers({
    flight, hotel
});

export default rootReducer;
