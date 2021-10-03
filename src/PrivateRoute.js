import React from 'react'
import {useSelector} from 'react-redux';
import {Route} from 'react-router-dom'
import Login from './components/auth/Login'
import About from './components/Profile/About';

const PrivateRoute = ({ path, component }) => {
    const user = useSelector(({user})=> user);

    return user?(<Route exact path={path} component ={component}/>):<Login/>
}

export default PrivateRoute;