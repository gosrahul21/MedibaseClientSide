import {
    GET_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USER_LOADING,
    LOGIN_USER_LOADING,
} from '../actions/actionTypes'

const initialState = {loading: false}

const userReducer =  (state=initialState,action) =>{

    switch(action.type){
        case GET_USER:
        case LOGIN_USER:
            return {
                ...state,
                ...action.payload,
                loading:false
            }
        case GET_USER_LOADING:
        case LOGIN_USER_LOADING:
            return {
                ...state,
                loading:true
            }
        case LOGOUT_USER:
        
            return {loading:false}
        default:
            return state
    }
}

export default userReducer;