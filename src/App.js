import React,{useEffect} from 'react'
import {BrowserRouter as Router,
Route,Switch} from 'react-router-dom';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
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
import { ADD_USER } from './actions/actionTypes';

const App = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    // useEffect(()=>{
    //         navigator.geolocation.getCurrentPosition((positon)=>{
                
    //         })
    // },[]);

    useEffect(()=>{

        
        const token = localStorage.getItem('token_id');
        if(token){
            //request the user details
            axios.get('http://localhost:8000/auth',{
                headers:{
                token
            }}).then(({data})=>{
                const {userId, email,role,roleId} = data;
                dispatch({
                    type:ADD_USER,
                    payload:{
                        userId,
                        email,
                        role,
                        roleId
                    }
                })
            }).catch((err)=>{
                console.log(err.data)
            })
        }
    },[])
   
    
    return (
        <>
            <Header/>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <PrivateRoute exact path="/signup" component={SignUp}/>
                <PrivateRoute exact path="/login" component={Login}/>
                <PrivateRoute exact path="/records" component={RecordDisplay}></PrivateRoute>
                <PrivateRoute exact path="/addrepo" component={AddMedicalRepo}/>
                <PrivateRoute exact path = '/settings' component={Setting}/>
                <PrivateRoute exact path = '/usersallowed' component={ChangePermisssions}></PrivateRoute>
                {/* <PrivateRoute exact path = '/myprofile'><Profile/></PrivateRoute> */}
                <PrivateRoute exact path = '/search-profile/:email' component={Profile}></PrivateRoute>
                <PrivateRoute exact path= "/about" component={About}/>
            </Switch>
        </>
      
    )
}

export default App;