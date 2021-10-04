import {combineReducers} from 'redux'
import userReducer from './userReducer'
import {doctor,patient} from './aboutReducer'

export default combineReducers({
    user:userReducer,
    patient,
    doctor
})