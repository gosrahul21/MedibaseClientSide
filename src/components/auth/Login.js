import React,{useState,useEffect} from 'react';
import {useHistory,Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import './Login.css'
import axios from 'axios'
import { GET_USER } from '../../actions/actionTypes';
import {toast} from 'react-toastify'

const Login = () => {
    const {user} = useSelector((state)=> state)
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{ 
        if(user.email)
            history.push('/')
    },[user,history])

    const loginSubmit =  (e) => {
        e.preventDefault();
       toast.promise( axios.post(`${process.env.REACT_APP_API}/auth/login`,{
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
       if(name)
       toast('Welcome '+name.split(' ')[0],{type:"success"})
    }),{
        pending:"Verifying credentials",
        success:"Login Successfull",
        error:"user login error"


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