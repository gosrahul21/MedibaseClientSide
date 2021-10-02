import {createStore} from 'redux';
// import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers';


// const middleware=[thunk];

const store = createStore(rootReducer,
composeWithDevTools())

export default store;