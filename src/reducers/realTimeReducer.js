import { CHANGE_MADE } from "../actions/actionTypes";
export default (state=false,action) =>{
    switch(action.type){
        case CHANGE_MADE:
            return !state;
        default :
            return state;
    }
}