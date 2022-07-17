import { createContext, useReducer } from "react";
import { AuthProps, AuthState } from "../@types/auth.types";

const AuthContext = createContext<any>(null);

// reducer is a function which updates the value in the state.
// it returns values for a specific action type and that value get updated in state
const authReducer = (state: AuthState, action: any): AuthState =>{
    return state;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
  };
  
function AuthProvider ({children}: AuthProps) {
    const [auth, dispatch] = useReducer(authReducer, initialState); 

    /**
     * dispatch login action 
     */
    function login(){

    }

    /**
     * dispatch logout action
     */
    function logout(){

    }


    return <AuthContext.Provider value={{auth}}>
        {children}
    </AuthContext.Provider>
} 