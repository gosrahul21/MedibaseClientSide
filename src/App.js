import React from 'react'
import {
Route,Switch} from 'react-router-dom';

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
import {useSelector} from 'react-redux'
import Alert from './Alert'

const App = () => {
    const {user} = useSelector((state)=>state)

    return (
        <>
            {user.email&&<Header/>}
            <Alert onClose={()=>{}}>hello this is medibase</Alert>
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