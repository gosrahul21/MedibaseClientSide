import React,{useState,useEffect} from 'react';
import './SignUp.css';
import {useSelector} from 'react-redux';
// import {auth,googleAuthProvider} from '../../firebase'
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
    const [ email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [role,setRole] = useState('patient');
    const history = useHistory()
    const {user} = useSelector((state)=> state)
    useEffect(()=>{
        if(user.email) history.push('/')
    },[user,history])

    const formSubmit = (e) => {
        e.preventDefault()
        // do rotation after successs recieved move to /about
        // to be implemented later
        

        // (async () => {
        //     const config = {
        //         path:process.env.REACT_APP_REGISTER_REDIRECT_path_FROM_MAIL,
        //         handleCodeInApp: true,
        //       };
        //     await auth.sendSignInLinkToEmail(email,config)
        //     //new page with messsage to click on the link send on mail

        // })().then(()=>{ console.log("done")}).catch((err)=>{
        //     console.log(err)
        // })
        if(password.length<6){
            return toast('Your password must be at least 6 characters long',{type:"warning"});
        }


        if(password!==password2){
            return toast('Please re-enter the same password',{type:"warning"})
        }

        axios.post(`${process.env.REACT_APP_API}/auth/register`,{
            email,
            password,
            role
        }).then(({data})=>{
            const {success} = data
            
            if(success){
                toast('SignUp complete');
                return history.push('/login')}
            else
                throw new Error("Registeration Failed")
            
        }).catch((err)=>{
            console.log(err.response.data)
            if(err.response.data.split(' ')[0]==='E11000')
                return toast(`User with email address ${email} already registered`,{type:"error"})
            toast('Sign up failed !'+err.response.data,{type: 'error'});
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
                <span>Already have account? <Link to='/login'>Sign In</Link></span>
            </form>

        </div>
    )
}
