import React ,{useEffect,useState} from 'react'
import './Profile.css'
import Avatar from '@material-ui/core/Avatar'
import SettingsIcon from '@material-ui/icons/Settings'
import {FileCopy} from '@material-ui/icons'
import { useHistory,useParams } from 'react-router'
import { Button,IconButton ,CircularProgress,Box} from '@material-ui/core'
import { useSelector } from 'react-redux'
import axios from 'axios'
import config,{path} from '../../config'



const Profile = () => {
    
    const {email} = useParams();
    const history = useHistory();
    const [loading,setLoading] = useState(false)
    const [targetUser,setTargetUser] = useState(null);
    const {user,doctor} = useSelector((state)=>state)
    const token = localStorage.getItem('token_id')
    const [prescribe,setPrescribe] = useState('Request Presribe')
    const [requestStatus,setRequestStatus] = useState(null);
    
    
    useEffect(()=>{
       // search for the required user


      if(!token ) return;
        setLoading(true)
        console.log(path)
      axios.post(`${path}/user/email/`,{email},{headers:{token}}).then(({data})=>{
        
        axios.get(`${path}/requestRecord/record-status/${data.id}`,config)
        .then(({data})=>
            {
                setRequestStatus(data)
                setLoading(false)
            })
            .catch(()=>setRequestStatus(null))
        
        
        setTargetUser(data);
        setLoading(false)
      }).catch((err)=>{

        if(user.email===email)
            history.push('/about')
          
          setTargetUser(null);
          setLoading(false)
      })
      return ()=>{
          setTargetUser(null)
          setRequestStatus(null)
      }
      
    },[email])



    const request =(e,type)=>{
        
        axios.post(`${path}/request`,{to:targetUser.id,type},{headers:{token}})
        .then(({data})=>{
            setRequestStatus(data)
            // setPrescribe('Presribe Requested')
        }).catch(({data})=>{
            // setPrescribe('Request Prescribe')
            console.log(data)
        })
    }
    
    const deleteRequest=()=>{
        axios.delete(`${path}/requestRecord/${requestStatus._id}`,{headers:{token}}).
        then(({data})=>setRequestStatus(null)).catch(({data})=>{
            console.log(data)
        })
    }

    return (
        <div className="profile">
          
           { targetUser?(<>
            <div className="profile__top">

                {/* avatar */}
                <img src={targetUser.avatar?targetUser.avatar:"#"} className="profile__img"/>
                <div className="name">
                    <h1>{(targetUser.patient?.name)||(targetUser.doctor?.name)}</h1>
                    <div className="name__id">
                        <h3>{email}</h3>
                        {/* Copy to clipboard need to be added */}
                        {/* <FileCopy onClick = {null} /> */}
                    </div>
                
                </div>
                
                {/* if normal user then show this--read access */}
               {(user.email!== email)&& (!requestStatus) &&
                    <Button onClick={(e)=>request(e,"read")}>
                         Request Read access
                    </Button>
                }
                {(user.email!== email)&& (requestStatus) && (requestStatus.type==='read')&&(requestStatus.status===true)&&
                //   delete this request
                    <Button onClick={(e)=>deleteRequest()}>
                         Stop Accesing
                    </Button>
                }
                {(user.email!== email)&& (requestStatus) && (requestStatus.type==='read')&&(requestStatus.status===false)&&
                //   delete this request
                    <Button onClick={(e)=>deleteRequest()}>
                         Cancel Read access request
                    </Button>
                }

                {/* if verified doctor then only show this -- write access */}
                {(user.email!== email)
                &&(doctor)
                &&(doctor.verified)
                && (!requestStatus) 
                &&<Button onClick={(e)=>request(e,'write')}>Send Prescribe Request</Button>}
                
                {(user.email!== email)&&(doctor) && (doctor.verified)&& (requestStatus) && (requestStatus.type==='write')&&(requestStatus.status===true)&&
                  
                  <Button onClick={(e)=>deleteRequest()}>
                       Stop Prescribing
                  </Button>
              }
                {(user.email!== email)&&(doctor) && (doctor.verified)&& (requestStatus) && (requestStatus.type==='write')&&(requestStatus.status===false)&&
                  
                  <Button onClick={(e)=>deleteRequest()}>
                       Cancel prescribe request
                  </Button>
              }
                
               {user.email===email&& <IconButton style={{right:0}} component={SettingsIcon} onClick ={()=>history.push('/about')}>
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