import React,{useState,useEffect} from 'react'
import './Header.css'
import { Link,useHistory } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notification from '../Notification';
import SearchPatient from '../../SearchPatient'
import Popup from '../../Popup'
import { LOGOUT_USER } from '../../actions/actionTypes';


export default function Header() {
    const [scrolled,setScrolled] = useState(false);
    const [showNotification,setShowNotification] = useState(false);
    const [logout,setLogout] = useState(false);

    const [email,setEmail] = useState(''); //search by email id
    const dispatch = useDispatch()
    const history = useHistory();
    
    // useEffect(()=>{
    //   document.body.addEventListener('click',()=>{
    //     setShowNotification(false)
    //   })
    // })
    // const handleScroll=() => {
    //     const offset=window.scrollY;
    //     if(offset > 140 ){
    //       setScrolled(true);
    //     }
    //     else{
    //       setScrolled(false);
    //     }
    //   }
    
    //   useEffect(() => {
    //     window.addEventListener('scroll',handleScroll)

    //     return ()=>{
    //         window.removeEventListener('scroll',handleScroll)
    //     }
    //   },[])

    
    const loginUserEmail = (useSelector((state)=> state.user.email))
    
      const notificationClick = () =>{
        setShowNotification(!showNotification)
        console.log(showNotification)
      }

      const logoutHandle = ()=>{
          localStorage.removeItem('token_id');
          dispatch({
              type:LOGOUT_USER
          })
          history.push('/login');
      }

    return (
        <div className={`navbar ${scrolled&&'scroll'}`}>
            <h1 className="cursor">MediBase</h1>
            { loginUserEmail&&(<div className="nav-right">
                <SearchPatient 
                    message="Search for Patient by Patient-Id" 
                    setEmail={setEmail} 
                    email={email}>
                    Search For Patient
                </SearchPatient>
                <Link className="navRightPart" to="/records">My Records</Link>
            
            
            <div className="navRightPart">
                  <Badge  onClick={notificationClick} badgeContent={1} color="primary" >
                      <MessageIcon fontSize="medium" style={{color:"blue"}}/>
                  </Badge>
            </div>
            
            <div className="navRightPart" >
              <Badge  onClick={notificationClick} badgeContent={1} color="primary" >
                    <NotificationsIcon fontSize="medium" style={{color:"blue"}}/>
                    </Badge>
                {showNotification&& <Notification/>}

            </div>
            

                
  
                
           
               <div className="navRightPart">
               <Link to='/settings' className="navRightPart rotate"><SettingsIcon/></Link>
             
               <div className="dropdown">
                  <Link to='/usersallowed'>Permissions</Link>
                  <Link to = {`/search-profile/${loginUserEmail}`}>Profile</Link>
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
