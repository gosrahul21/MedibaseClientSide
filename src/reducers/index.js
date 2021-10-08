import {combineReducers} from 'redux'
import userReducer from './userReducer'
import {doctor,patient} from './aboutReducer'
import realTimeReducer from './realTimeReducer'
export default combineReducers({
    user:userReducer,
    patient,
    doctor,
    realtime:realTimeReducer
})