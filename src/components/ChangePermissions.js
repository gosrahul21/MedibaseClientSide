import React,{useEffect,useState} from 'react'
import './ChangePermissions.css'
import {useParams,Link} from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {Avatar} from '@material-ui/core'
import Confirm from './Confirm'
import axios from 'axios'
import config from '../config';
import {path} from '../config'
//request format after populating
// {
//     status: false,
//     _id: 615cc6cd778f453784a4f38b,            //request id
//     to: {
//       role: 'patient',
//       tokens: [],
//       _id: 615b285534ddd83998989e76,
//       email: 'gosrahul22@gmail.com',
//       avatar: 'https://www.babycenter.in/ims/2020/11/iStock-1128658456_wide.jpg',
//       password: '$2a$10$FnVoB5ZoglyBu5WZB3HdRu2zkRAohC0p//0IrFjC1G6CTFZ0Eo.wG',
//       __v: 0
//     },
//     userId: 615b5f7c08882b269c23bdc2,
//     type: 'read',
//     __v: 0,
//     name: 'Rahul kumar'
//   }

const ChangePermissions= ({})=>{

    const [records,setRecords] = useState([])
    const {status} = useParams();
    const token = localStorage.getItem('token_id')
    const allowRequest = (id) => {
        // console.log(id)
        axios.put(`${path}/requestRecord/allow/${id}`,{},{headers:{token}}).then(({})=>{
            setRecords(records.filter((rec)=>rec._id!==id))
        }).catch((err)=>{
            console.log(err.data)
        })
    }
    

    const revokeRequest = (id)=>{

        axios.delete(`${path}/requestRecord/${id}`,{headers:{token}}).then(({})=>{
            setRecords(records.filter((rec)=>rec._id!==id))
        }).catch((err)=>{
            console.log(err.data)
        })
    
    }

    useEffect(()=>{
        axios.get(`${path}/requestRecord/${status}`,{headers:{token}})
        .then(({data})=>{
            setRecords(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        return ()=>{
            setRecords([])
        }
    },[status])


    return <div className="listofusers">
        
    {records.map(({_id,to,name,type})=>(
        <div className="userAllowed">
        <div className="userAllowed-right">
            {/* avatar */}
            <Link to={`/search-profile/${to.email}`}>
                <Avatar className="avatar" src={to.avatar}/> </Link>
                <Link to = {`/search-profile/${to.email}`} ><p>{name}</p></Link>
                {to.role==='doctor'&& <LocalHospitalIcon style={{color:"green"}}/>}
            

            
        </div>
        
        <Confirm type={type} callback={status==='granted'?revokeRequest:allowRequest} id={_id} message={`Do you want to ${status==='granted'?"Deny":"Allow"} ${type} Permission to ${to.email}`}>{status==='granted'?"Deny":"Allow"} {type} access</Confirm>
    </div>
  
    ))}
        
        {!records.length&& <h1>You have not granted permissions to other Users</h1>}
        
        
    </div>
}

export default ChangePermissions;