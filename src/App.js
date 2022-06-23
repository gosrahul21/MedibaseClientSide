import React,{lazy, Suspense} from 'react'
import './App.css'
import {
Route,Switch} from 'react-router-dom';

// import Login from './components/auth/Login';
// import SignUp from './components/auth/SignUp';
// import Header from './components/Header/Header';
// import RecordDisplay from './components/RecordDisplay';
// import AddMedicalRepo from './components/AddMedicalRepo';
// import Home from './Home';
import Setting from './components/Setting';
// import ChangePermissions from './components/ChangePermissions';
// import Profile from './components/Profile/Profile';
// import About from './components/Profile/About';
import PrivateRoute from './PrivateRoute'
import Admin from './components/Profile/Admin'
import {useSelector} from 'react-redux'
import Alert from './Alert'

const  Login = lazy(()=>import('./components/auth/Login'))
const SignUp = lazy(()=>import('./components/auth/SignUp'))
const Header = lazy(()=>import('./components/Header/Header'));
const RecordDisplay = lazy(()=>import('./components/RecordDisplay'));
const AddMedicalRepo = lazy(()=>import('./components/AddMedicalRepo'));
const Home = lazy(()=>import("./Home"));
const ChangePermissions = lazy(()=>import('./components/ChangePermissions'));
const Profile = lazy(()=>import('./components/Profile/Profile'));
const About = lazy(()=>import('./components/Profile/About'));


console.log("login",Login)
const App = () => {
    const {user} = useSelector((state)=>state)

    return (
        <div className="app">
              <Suspense fallback={<div>...Loading</div>}>
            {user.email&&<Header/>}
            <Alert onClose={()=>{}}>hello this is medibase</Alert>
          
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/records" component={RecordDisplay}></PrivateRoute>
                    <Route exact path="/addrepo" component={AddMedicalRepo}/>
                    <PrivateRoute exact path = '/settings' component={Setting}/>
                    <PrivateRoute exact path = '/permission/:status' component={ChangePermissions}></PrivateRoute>
                    {/* <PrivateRoute exact path = '/myprofile'><Profile/></PrivateRoute> */}
                    <PrivateRoute exact path = '/search-profile/:email/' component={Profile}></PrivateRoute>
                    <PrivateRoute exact path= "/about" component={About}/>
                    <Admin exact path="/admin"/>
                </Switch>
            </Suspense>
            
        </div>
      
    )
}

export default App;