import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './Login.css'
import axios from 'axios'
import { GET_USER } from '../../actions/actionTypes';
import { path } from '../../config';
const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch()

    const loginSubmit =  (e) => {
        e.preventDefault();
        axios.post(`${path}/auth/login`,{
            email,password
        }).then(({data})=>{
            const {userId,name, email,role,avatar,token} = data;
            //store the token in localstorage
           localStorage.setItem('token_id',token)
           dispatch({
               type:GET_USER,
               payload:{
                   userId,
                   name,
                   email,
                   role,
                   avatar
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
            {/* <button type="submit" className="submit-btn google-login" value="Sign up through Google">Sign Up through Google</button> 
        <button type="submit" className="submit-btn facebook-login" value="Sign up through Facebook">Sign up using Facebook</button>  */}
        <span>Don't have account? <Link to='/signup' > Sign Up</Link></span>
        </form>
    </div>)
}


export default Login;