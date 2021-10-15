import React ,{useState,useEffect} from 'react'
import './ShowPrescription.css'
import {AddCircle} from '@material-ui/icons'
import { IconButton,CircularProgress } from '@material-ui/core'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ShowPrescription({email,type,userId}) {
    
    const user = useSelector((state)=>state.user)
    const  [histories,setHistories] = useState([]);
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API}/history/${userId}`,{headers: {token:localStorage.getItem('token_id')}})
        .then(({data})=>{
            setHistories(data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err);
            setLoading(false)
        })
    },[userId])


    const renderHistory = ()=>{
        return histories.map(({_id,docId,date})=>(
            <Link to={`/detailed-pres/${_id}`} key={_id}>
                  <p>Prescribed by {docId.name} on {new Date(date).toLocaleDateString()}</p>
            </Link>
              
            
        ))
    }
    return (
        <div className="ShowPrescription">
            <div className="row__header">
                {/* if the user is doctor and the request is type then only show the add prescription button */}
            <h2>Recent medical History </h2>{ user.role==='doctor'&&type&& type==='write'&& <Link to={`/${email}/addrepo`}><IconButton> <AddCircle/></IconButton></Link> }
            </div>
            
            {loading?<CircularProgress/>:<>
            {renderHistory()}
            <div className="more">
            <Link to='/record'><span style={{color:"blueviolet"}}>View More</span></Link>
            </div>
            </>}
        </div>
    )
}
