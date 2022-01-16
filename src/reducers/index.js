import {combineReducers} from 'redux'
import userReducer from './userReducer'
import {doctor,patient} from './aboutReducer'
import realTimeReducer from './realTimeReducer'
import testReducer from './testReducer'


export default combineReducers({
    user:userReducer,
    patient,
    doctor,
    realtime:realTimeReducer,
    test:testReducer
})