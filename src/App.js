import React,{useEffect} from 'react'
import {
Route,Switch} from 'react-router-dom';
import axios from 'axios'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Header from './components/Header/Header';
import RecordDisplay from './components/RecordDisplay';
import AddMedicalRepo from './components/AddMedicalRepo';
import Home from './Home';
import Setting from './components/Setting';
import ChangePermisssions from './components/ChangePermissions';
import Profile from './components/Profile/Profile';
import About from './components/Profile/About';
import PrivateRoute from './PrivateRoute'
import {useDispatch,useSelector} from 'react-redux'
import {  GET_DOCTOR_ABOUT, GET_NORM_USER_ABOUT, GET_USER } from './actions/actionTypes';
import {path} from './config';



const App = () => {
    

    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user)
    const token = localStorage.getItem('token_id');
    // useEffect(()=>{
    //         navigator.geolocation.getCurrentPosition((positon)=>{
                
    //         })
    // },[]);
// token login 
    useEffect(()=>{
        
        if(token){
            //request the user details
            axios.get(`${path}/auth`,{headers:{token}}).then(({data})=>{
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
            }).catch((err)=>{
                console.log(err.data)
            })
        }
    },[dispatch,token])
   

    useEffect(()=>{
       
        if(user.email){
       
            if(user.role === 'patient'){
                //login user is patient
                axios.get(`${path}/patient`,{headers:{token}})
                .then(({data})=>{
                    dispatch({
                        type:GET_NORM_USER_ABOUT,
                        payload:data
                    })
                }).catch(()=>{
                    //give some error message in the screen to create profile
                    //and redirect to create profile page
                    // history.push('/about')
                })
            }else{
                //login user is doctor
                axios.get(`${path}/doctor`,{headers:{token}}).then(({data})=>{
                    dispatch({
                        type:GET_DOCTOR_ABOUT,
                        payload:data
                    })
                }).catch(({data})=>{
                    //give some error message in the screen to create profile
                    //and redirect to create profile page
                    // history.push('/about')
                    console.log("error data",data)
                })
            }
        }

    },[user,token,dispatch])


    
    return (
        <>
            {user.email&&<Header/>}
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/records" component={RecordDisplay}></PrivateRoute>
                <Route exact path="/addrepo" component={AddMedicalRepo}/>
                <PrivateRoute exact path = '/settings' component={Setting}/>
                <PrivateRoute exact path = '/permission/:status' component={ChangePermisssions}></PrivateRoute>
                {/* <PrivateRoute exact path = '/myprofile'><Profile/></PrivateRoute> */}
                <PrivateRoute exact path = '/search-profile/:email/' component={Profile}></PrivateRoute>
                <PrivateRoute exact path= "/about" component={About}/>
              
            </Switch>
        </>
      
    )
}

export default App;