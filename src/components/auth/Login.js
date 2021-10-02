import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './Login.css'
import axios from 'axios'
import { ADD_USER } from '../../actions/actionTypes';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch()

    const loginSubmit =  (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/auth/login',{
            email,password
        }).then(({data})=>{
            const {userId, email,role,roleId,token} = data;
            //store the token in localstorage
           localStorage.setItem('token_id',token)
           dispatch({
               type:ADD_USER,
               payload:{
                   userId,
                   email,
                   role,
                   roleId
               }
           })
           history.push('/')
        }).catch((err)=>{
            console.log(err.response)
        })
    }

    return (<div className="login">
                <form onSubmit={loginSubmit}>
                    <h1>Sign In</h1>
                    <input 
                        type="text" 
                        onChange = {(e)=>setEmail(e.target.value)} 
                        value={email} 
                        placeholder="email/UserName"
                    />
                    <input 
                        type="password" 
                        onChange = {(e)=>setPassword(e.target.value)} 
                        value={password} 
                        placeholder="password"
                    />
            {/* <input type="checkbox"/><span>Unhide password</span> */}
            <button className="submit-btn" type="submit" value="Login">Login</button>
            <button type="submit" className="submit-btn google-login" value="Sign up through Google">Sign Up through Google</button> 
        <button type="submit" className="submit-btn facebook-login" value="Sign up through Facebook">Sign up using Facebook</button> 
        </form>
    </div>)
}


export default Login;