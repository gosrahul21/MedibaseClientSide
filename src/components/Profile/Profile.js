import React ,{useEffect,useState} from 'react'
import './Profile.css'
import Avatar from '@material-ui/core/Avatar'
import SettingsIcon from '@material-ui/icons/Settings'
import {FileCopy} from '@material-ui/icons'
import { useHistory,useParams } from 'react-router'
import { Button,IconButton ,CircularProgress,Box} from '@material-ui/core'
import { useSelector } from 'react-redux'
import axios from 'axios'



const Profile = () => {

    const {email} = useParams();
    const history = useHistory();
    const [loading,setLoading] = useState(false)
    const [targetUser,setTargetUser] = useState(null);
    const {user,doctor} = useSelector((state)=>state)
    const token = localStorage.getItem('token_id')
    const [prescribe,setPrescribe] = useState('Request Presribe')
    useEffect(()=>{
       // search for the required user


      if(!token ) return;
      setLoading(true)
      axios.post('http://localhost:8000/user/email/',{email},{ headers:{
        token
      }}).then(({data})=>{
        setTargetUser(data);
        setLoading(false)
      }).catch((err)=>{

        if(user.email===email)
          history.push('/about')
          console.log({...err.data})
          setTargetUser(null);
          setLoading(false)
      })

      return ()=>{
          setTargetUser(null)
      }
      
    },[email])



    const request =(e,type)=>{
        axios.post('http://localhost:8000/request',{to:email,type},{headers:{
            token
        }}).then(({data})=>{
            setPrescribe('Presribe Requested')
        }).catch(()=>{
            setPrescribe('Request Prescribe')
        })
    }
    
    return (
        <div className="profile">
          
           { targetUser?(<>
            <div className="profile__top">
                {/* avatar */}
                <img src={targetUser.avatar?targetUser.avatar:"#"} className="profile__img"/>
                <div className="name">
                    <h1>{targetUser.patient?.name}</h1>
                    <div className="name__id">
                        <h3>{email}</h3>
                        {/* Copy to clipboard need to be added */}
                        {/* <FileCopy onClick = {null} /> */}
                    </div>
                
                </div>
                
                {/* if normal user then show this--read access */}
               {(user.email!== email)&& <Button onClick={(e)=>request(e,"read")}>Request access</Button>}
                {/* if verified doctor then only show this -- write access */}
                {(user.email!== email)&&(doctor)&&(doctor.verified)&&<Button onClick={(e)=>request(e,'write')}>{prescribe}</Button>}
                

               {user.email===email&& <IconButton component={SettingsIcon} onClick ={()=>history.push('/about')}>
                    <SettingsIcon/>
                </IconButton>}

            </div>
     
            {/* edit option */}
            <div className="profile__row">
            {/* Permissions */}
            {/* activities */}

            </div>
            
                
             {/* medical history */}
             </>):(loading?(
            <CircularProgress color="inherit" />):<h1>This user don't have profile</h1>)}
        </div>
    );
}

export default Profile;