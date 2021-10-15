import React ,{useEffect,useState} from 'react'
import './Profile.css'
import SettingsIcon from '@material-ui/icons/Settings'
import {PhotoCamera} from '@material-ui/icons'
import { useHistory,useParams } from 'react-router'
import { Button,IconButton ,CircularProgress} from '@material-ui/core'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import RenderProfileRoute from '../../RenderProfileRoute'
import base64,{upload} from '../../functions/imageUpload'



const Profile = () => {
    
    const {email} = useParams();
    const history = useHistory();
    const [loading,setLoading] = useState(false)
    const [targetUser,setTargetUser] = useState(null);
    const {user,doctor,realtime} = useSelector((state)=>state)
    const token = localStorage.getItem('token_id')
    const [requestStatus,setRequestStatus] = useState(null);
    const dispatch = useDispatch()
    // const [pending,setPending] = useState(null)   //pending request for current user
    // const [granted,setGranted] = useState(null)   //granted access request given by current user
    
    
    useEffect(()=>{
       // search for the required user


      if(!token ) return;
        setLoading(true)
      axios.post(`${process.env.REACT_APP_API}/user/email/`,{email},{headers:{token}}).then(({data})=>{

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
      
    },[email,token,history,user.email])

    useEffect(()=>{
        if(!targetUser) return
        axios.get(`${process.env.REACT_APP_API}/requestRecord/record-status/${targetUser.id}`,{headers:{token:localStorage.getItem('token_id')}})
        .then(({data})=>
            {
                setRequestStatus(data)
                setLoading(false)
            })
            .catch(()=>setRequestStatus(null))


        
            return ()=>{
               
                setRequestStatus(null)
            } 
    },[targetUser,realtime])

    const request =(e,type)=>{
        
        axios.post(`${process.env.REACT_APP_API}/request`,{to:targetUser.id,type},{headers:{token}})
        .then(({data})=>{
            setRequestStatus(data)
            // setPrescribe('Presribe Requested')
        }).catch(({data})=>{
            // setPrescribe('Request Prescribe')
            console.log(data)
        })
    }
    
    const deleteRequest=()=>{
        axios.delete(`${process.env.REACT_APP_API}/requestRecord/${requestStatus._id}`,{headers:{token}})
        .then(()=>setRequestStatus(null)).catch(({data})=>{
            console.log(data)
        })
    }

    

    return (
        <div className="profile">
          
           { targetUser?(<>
            <div className="profile__top">

                {/* avatar */}
                <div style={{
                    backgroundImage:`url(${user.email===email?user.avatar:targetUser?.avatar})`
                }}  className="profile__img">

                   {user.email===email
                   &&(<div className="profile__change">
                       <label  htmlFor='avatar' style={{cursor:"pointer",
                       display:"flex"
                       ,flexDirection:"column",
                       justifyContent:"center",
                       alignItems:"center"
                       }}>
                       
                       <IconButton  component="span">
                           <PhotoCamera/>
                        </IconButton>
                            

                                Change Profile Photo

                                <input name='avatar' id='avatar' onChange={(e)=>{
                            base64(e.target.files[0]).then((img)=>{
                                
                                // setSelected(true)
                                upload(img,dispatch)
                            })
                            
                        }} accept='image/*' type = 'file' />
                    
                            </label>
                       
                        
                       
                     
                    </div>)}
                    
                    
                    </div>
                
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
            
            {/* Permissions */}
            {/* activities */}
{/* 
            if request does not exist then don't show the profile*/}
              {(requestStatus&& requestStatus.status)|| (user.email===email) ?(<div className="profile__row">
                  <RenderProfileRoute userId={targetUser.id} type={requestStatus?.type} email={email}/>
                  </div>)
                  :<h2>{`You don't have permission to access the ${(targetUser.patient?.name)||(targetUser.doctor?.name)}'s profile`}</h2>}

             {/* medical history */}
             </>):(loading?(
            <CircularProgress color="inherit" />):<h1>This user don't have profile</h1>)}
        </div>
    );
}

export default Profile;