import {
    GET_USER,
    LOGIN_USER,
    LOGOUT_USER
} from '../actions/actionTypes'

const initialState = {}

const userReducer =  (state=initialState,action) =>{

    switch(action.type){
        case GET_USER:
        case LOGIN_USER:
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

export default userReducer;