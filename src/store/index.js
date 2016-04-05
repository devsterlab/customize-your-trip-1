import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

function deserialize(stateString) {
    let state = JSON.parse(stateString);
    state.summary.date = new Date(state.summary.date);
    for (let step of state.summary.steps) {
        step.date = new Date(step.date);
        step.dateFrom = new Date(step.dateFrom);
        step.dateTo = new Date(step.dateTo);
    }
    return state;
}

const createPersistentStore = compose(
    applyMiddleware(thunk),
    persistState(null, {key: 'customizeTrip', deserialize})
)(createStore);

export default function configureStore(initialState) {
    return createPersistentStore(rootReducer, initialState);
}
