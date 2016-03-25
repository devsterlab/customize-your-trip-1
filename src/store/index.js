import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

const createPersistentStore = compose(
    applyMiddleware(thunk),
    persistState(null, {key: 'customizeTrip'})
)(createStore);

export default function configureStore(initialState) {
    return createPersistentStore(rootReducer, initialState);
}
