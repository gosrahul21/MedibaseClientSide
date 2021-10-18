import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Login from './components/auth/Login'
import ProfileRoute from './ProfileRoute'
import {GET_USER} from './actions/actionTypes'
import axios from 'axios'
import {CircularProgress} from '@material-ui/core'

const PrivateRoute = ({ path, component }) => {
    const {user} = useSelector((state)=> state);
    const token = localStorage.getItem('token_id');
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true)

    //if(user exist then check whether he has profile or not)
    //if profile not exist then redirect him to /about page to create profile
    //IF profile is loading then show circular progress dialog

    // if profile is loaded then and user.email is not present then send it to login

    // if profile is loaded and user.email is present but proflie is not present then move to about page

    useEffect(()=>{
    
    if(token){
        //request the user details
        axios.get(`${process.env.REACT_APP_API}/auth`,{headers:{token}}).then(({data})=>{
            const {userId,name, email,role,avatar} = data;
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
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
            console.log(err.data)
        })
    }
},[dispatch,token])

    return loading?<div 
    style={
        {
            height:"100%",
            display: "flex",
            alignItems:"center",
            justifyContent: "center"
        }
    }><CircularProgress/></div>:(user.email?<ProfileRoute path={path}  component={component}/>:<Login/>)
    //return user.email?<ProfileRoute path={path}  component={component}/>:<Login/>
}

export default PrivateRoute;