import { CHANGE_MADE } from "../actions/actionTypes";
const realTimeReducer= (state=false,action) =>{
    switch(action.type){
        case CHANGE_MADE:
            return !state;
        default :
            return state;
    }
}

export default realTimeReducer;