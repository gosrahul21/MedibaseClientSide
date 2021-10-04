import React from 'react'
import {useSelector} from 'react-redux';
import {Route} from 'react-router-dom'
import Login from './components/auth/Login'
import About from './components/Profile/About';

const PrivateRoute = ({ path, component }) => {
    const {user,patient,doctor} = useSelector((state)=> state);
    //if(user exist then check whether he has profile or not)
    //if profile not exist then redirect him to /about page to create profile


    return user.email?((patient|| doctor)?<Route exact path={path} component ={component}/>:<About/>):<Login/>
}

export default PrivateRoute;