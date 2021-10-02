import {
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
        case LOGOUT_USER:
            return {}
        default:
            return state
    }
}