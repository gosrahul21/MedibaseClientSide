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


    const [email,setEmail] = useState(''); //search by email id
    const dispatch = useDispatch()
    const history = useHistory();
    const {user} = useSelector((state)=> state)
    const token = localStorage.getItem('token_id')

    const [online,setOnline]= useState(0)
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         axios.get(`${path}/notification`,{headers:{token}})
    //         .then(({data})=>setNotification(data))
    //         .catch((err)=>console.log("error in fetching notificaion"))
    //     },30000)
    // })

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/notification`,{headers:{token}})
        .then(({data})=>setNotification(data))
        .catch((err)=>console.log("error in fetching notificaion"))

        const socket_path= 'ws://medihistorybase.herokuapp.com/'
        const socket = io(socket_path,{ transports: ['websocket', 'polling', 'flashsocket'] })

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
            <h1 className="cursor">MediBase</h1>
            { loginUserEmail&&(<div className="nav-right">

            <div className="navRightPart" >
                <p>{online} online users</p>

            </div>


                <SearchPatient 
                    
                    message="Search for patient by their email address" 
                    setEmail={setEmail} 
                    email={email}>
                    Search For Patient
                </SearchPatient>

                <div className="navRightPart">
                    <Link to = {`/search-profile/${loginUserEmail}`}>
                        <Avatar className="avatar" src={user.avatar}/>
                    </Link>
                </div>
                
                <Link className="navRightPart" to="/records">My Records</Link>
            
{/*             
            <div className="navRightPart">
                  <Badge  onClick={notificationClick} badgeContent={1} color="primary" >
                      <MessageIcon fontSize="small" style={{color:"blue"}}/>
                  </Badge>
            </div> */}
            
            
            
            <div className="navRightPart" >
                <Link to='/permission/pending'> 
                    <Badge  onClick={notificationClick} style={{padding:0}} badgeContent={notification.length} color="primary" >
                        <NotificationsIcon fontSize="default" style={{color:"blue"}}/>
                    </Badge>
                </Link>
              
                {/* {showNotification&& <Notification/>} */}

            </div>
            

            
               <div className="navRightPart">
                <SettingsIcon/>
             
               <div className="dropdown">
                  <Link to='/permission/granted'>Granted User</Link>
                  {/* <Link to = {`pending-permission`}>Profile</Link> */}
                  <Popup 
                    className='drop-item'
                    summary="Confirm logout"
                    message="Please Confirm you want to logout by clicking yes"
                    callback={logoutHandle}
                    onClick={logoutHandle }>Logout<ExitToAppIcon/></Popup>
               
               </div>
               </div>
                
                
            </div>)}
        </div>
    )
}
