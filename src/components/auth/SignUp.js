import React,{useState} from 'react'
import './SignUp.css'
import {auth,googleAuthProvider} from '../../firebase'
import { useHistory } from 'react-router';
import axois from 'axios'
import axios from 'axios';

export default function SignUp() {
    const [ email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [role,setRole] = useState('');
    const history = useHistory()
 


    const formSubmit = (e) => {
        e.preventDefault()
        // do rotation after successs recieved move to /about
        // to be implemented later
        

        // (async () => {
        //     const config = {
        //         url:process.env.REACT_APP_REGISTER_REDIRECT_URL_FROM_MAIL,
        //         handleCodeInApp: true,
        //       };
        //     await auth.sendSignInLinkToEmail(email,config)
        //     //new page with messsage to click on the link send on mail

        // })().then(()=>{ console.log("done")}).catch((err)=>{
        //     console.log(err)
        // })
        axios.post('http://localhost:8000/auth/register',{
            email,
            password,
            role
        }).then(({data})=>{
            const {email,role,success} = 
            data
            if(success)
                return history.push('/login')
            else
                throw new Error("Registeration Failed")
        }).catch((err)=>{
            console.log(err.data);
        })


    }   

    const onHandleChange = (e,setState)=>{
        setState(e.target.value)
    }

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={formSubmit}>
                <input 
                    type="email" 
                    value={email}
                    onChange = {(e)=>onHandleChange(e,setEmail)} 
                    placeholder="Email"
                    />
                <input 
                    type = "password" 
                    value={password}
                    onChange = {(e)=>onHandleChange(e,setPassword)} 
                    placeholder="Password"
                />
                <input 
                    type = "password" 
                    value={password2}
                    onChange = {(e)=>onHandleChange(e,setPassword2)} 
                    placeholder="Re-Enter Password"/>
                <label for ='role'>Select Role</label>
                <select 
                    onChange = {(e)=>onHandleChange(e,setRole)}
                    value={role} 
                    name="role" id="role"
                >
                    <option value="patient">User</option>
                    <option value="doctor">Doctor</option>
                </select>
                <button className='submit-btn' type="submit" value="Sign Up">Sign up</button>
            </form>

        </div>
    )
}
