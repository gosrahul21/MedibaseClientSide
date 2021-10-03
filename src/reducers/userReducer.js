import {
    ADD_DOCTOR_ABOUT,
    ADD_NORM_USER_ABOUT,
    ADD_USER,
    LOGOUT_USER
} from '../actions/actionTypes'

const initialState = {}

export default (state=initialState,action)=>{
    console.log(action.type)
    switch(action.type){
        case ADD_USER:
            console.log({...state,...action.payload})
            return {
                ...state,
                ...action.payload
            }
        case ADD_DOCTOR_ABOUT:
            return {
                ...state,
                doctor:action.payload
            }
        case ADD_NORM_USER_ABOUT:
            return {
                ...state,
                patient:action.payload
            }
        case LOGOUT_USER:
            return {}
        default:
            return state
    }
}