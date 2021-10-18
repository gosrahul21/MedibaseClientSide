import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {Route } from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import About from './components/Profile/About'
import {GET_DOCTOR_ABOUT,GET_NORM_USER_ABOUT} from './actions/actionTypes'
function ProfileRoute({path,component}) {

    const [loading,setLoading] = useState(true);
    const {user,patient,doctor} = useSelector((state)=>state)
    const token = localStorage.getItem('token_id')
    const dispatch = useDispatch()
    //load  the profile if profile doesn't exist then go to the about page else create
    // render it to the desire page
    useEffect(()=>{
        
            // setLoading(true)
            if(user.role === 'patient'){
                //login user is patient
                axios.get(`${process.env.REACT_APP_API}/patient`,{headers:{token}})
                .then(({data})=>{
                    dispatch({
                        type:GET_NORM_USER_ABOUT,
                        payload:data
                    })
                    setLoading(false)
                }).catch(()=>{
                    //give some error message in the screen to create profile
                    //and redirect to create profile page
                    // history.push('/about')
                    setLoading(false)
                })
            }else{
                //login user is doctor
                axios.get(`${process.env.REACT_APP_API}/doctor`,{headers:{token}}).then(({data})=>{
                    dispatch({
                        type:GET_DOCTOR_ABOUT,
                        payload:data
                    })
                    setLoading(false)
                }).catch(({data})=>{
                    //give some error message in the screen to create profile
                    //and redirect to create profile page
                    // history.push('/about')
                    console.log("error data",data)
                    setLoading(false)
                })
            }
        

   

    },[dispatch,token,user.role])


    return (
        loading?<div 
            style={
                {
                    height:"100%",
                    display: "flex",
                    alignItems:"center",
                    justifyContent: "center"
                }
            }><CircularProgress/></div>:((patient||doctor)?<Route exact path={path} component={component}/>:<About/>)
    )
}

export default ProfileRoute
