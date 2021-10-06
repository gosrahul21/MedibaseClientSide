import {
    GET_USER,
    LOGOUT_USER
} from '../actions/actionTypes'

const initialState = {}

export default (state=initialState,action)=>{
    console.log(action.type)
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_USER:
            return {}
        default:
            return state
    }
}