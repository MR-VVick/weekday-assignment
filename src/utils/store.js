import { createStore } from 'redux';
import rootReducer from '../service/reducers';

const store = createStore(rootReducer);

export default store;
