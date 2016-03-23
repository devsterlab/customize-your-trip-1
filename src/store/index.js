import { compose, createStore } from 'redux';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage'

const createPersistentStore = compose(
    persistState()
)(createStore);

export default function configureStore(initialState) {
    return createPersistentStore(rootReducer, initialState);
}
