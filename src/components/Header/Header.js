import React,{useState,useEffect} from 'react'
import './Header.css'
import { Link,useHistory } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {Badge,Avatar}  from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SearchPatient from '../../SearchPatient'
import Popup from '../../Popup'
import { CHANGE_MADE, LOGOUT_USER } from '../../actions/actionTypes';
import axios from 'axios';

import io from 'socket.io-client'

export default function Header() {
    const [showNotification,setShowNotification] = useState(false);
    const [notification,setNotification] = useState([]);

    console.log("increment clicked from header");
    const [email,setEmail] = useState(''); //search by email id
    const dispatch = useDispatch()
    const history = useHistory();
    const {user} = useSelector((state)=> state)
    const token = localStorage.getItem('token_id')
    const [online,setOnline]= useState(0)
    const [showDropdown,setShowDropdown] = useState(false);


    useEffect(()=>{
        
        window.addEventListener('click',closeDropdown);

        return ()=>{
            window.removeEventListener('click',closeDropdown);
        }
    },[])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/notification`,{headers:{token}})
        .then(({data})=>setNotification(data))
        .catch((err)=>console.log("error in fetching notificaion"))

        // const socket_path= 'https://medihistorybase.herokuapp.com/'
        const socket = io(process.env.REACT_APP_API,{ transports: ['websocket', 'polling', 'flashsocket'] })

        socket.emit('join',{id:user.userId})
        socket.on('requestInserted',(data)=>{
            const audio = new Audio("/ping.mp3")
            audio.play();
            dispatch({
                type:CHANGE_MADE
            })
            axios.get(`${process.env.REACT_APP_API}/notification`,{headers:{token}})
            .then(({data})=>setNotification(data))
            .catch((err)=>console.log("error in fetching notificaion"))
        })
        

        socket.on('onlineUsers',(count)=>{
            setOnline(count);
        })

        return ()=>{
            socket.disconnect();
            socket.off();
        }

    },[token,dispatch,user.userId])
    
    // if(user.email)
    // axios.get(`${path}/notification',{headers:{
    //     token:localStorage.getItem('token_id')
    // }}).then(({data})=>setNotification(data)).catch((err)=>console.log("error in fetching notificaion"))
    
    const closeDropdown = ()=>{
      
       setShowDropdown(false)
       console.log('close drop down')
    }
 
    const loginUserEmail = (useSelector((state)=> state.user.email))
    
    const notificationClick = () =>{
    setShowNotification(!showNotification)
    
    }

    const logoutHandle = ()=>{
        localStorage.removeItem('token_id');
        dispatch({
            type:LOGOUT_USER
        })
        history.push('/login');
    }


    return (
        <div className={`navbar`}>


            <Link style={{height:"50px"}} to='/'> <img style={{height:"100%"}}src='/medibase.png' alt="Medibase" /></Link>

          
           
            <div className='searchBox'>
                <SearchPatient 
                    message="Search for patient by their email address" 
                    setEmail={setEmail} 
                    email={email}>
                    Search For Patient
                </SearchPatient>
            </div>



            <div>
            { loginUserEmail&&(<div className="nav-right">

            <div className="navRightPart" >
                <p onClick={()=>dispatch({type:"INCREMENT"})}>{online} online users</p>

            </div>




            <div className="navRightPart">
                <Link to = {`/search-profile/${loginUserEmail}`}>
                    <Avatar className="avatar" src={user.avatar}/>
                </Link>
            </div>
                

            <Link className="navRightPart"  to="/records">My Records</Link>

            
            <div className="navRightPart" >
                <Link to='/permission/pending'> 
                    <Badge  onClick={notificationClick} style={{padding:0}} badgeContent={notification.length} color="primary" >
                        <NotificationsIcon fontSize="default" style={{color:"blue"}}/>
                    </Badge>
                </Link>

            </div>



                <div className="navRightPart">
                    <SettingsIcon onClick = {(e)=>{setShowDropdown(!showDropdown);
                    e.stopPropagation();
                    }}
                    />

                {showDropdown?(<div className="dropdown" >
                    <Link to='/permission/granted'>Granted User</Link>
                    <Link to='/permission/granted'>Notifications</Link>
                    <Link to='/permission/granted' style={{whiteSpace: 'nowrap'}}>Medical History</Link>
                    {/* <Link to = {`pending-permission`}>Profile</Link> */}
                    <Popup 
                        className='drop-item'
                        summary="Confirm logout"
                        message="Please Confirm you want to logout by clicking yes"
                        callback={logoutHandle}
                        onClick={logoutHandle }
                        >Logout<ExitToAppIcon/>
                    </Popup>

                    </div>):null}
                </div>
                    
                    
                </div>)}
            </div>
                        
        </div>
    )
}
