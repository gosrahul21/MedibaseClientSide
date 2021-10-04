import {GET_DOCTOR_ABOUT,GET_NORM_USER_ABOUT, LOGOUT_USER} from '../actions/actionTypes'

export const patient = (state=null,action)=>{
    switch(action.type){
        case GET_NORM_USER_ABOUT:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_USER:
            return null
        default:
            return state
    }    
}

export const doctor = (state=null,action)=> {
    switch(action.type){
        case GET_DOCTOR_ABOUT:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_USER:
            return null
        default:
            return state
    }
}