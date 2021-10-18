import React,{useState,useEffect} from 'react'
import './RecordDisplay.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Button,CircularProgress } from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'

function RecordDisplay() {

    //fetch the records and render the records
    const [history,setHistory] = useState([])
    const [loading,setLoading] = useState(false)
    const token = localStorage.getItem('token_id')
    useEffect(()=>{
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API}/history`,{headers:{token}})
        .then(({data})=>{
            setHistory(data)
            setLoading(false)
        })
        .catch(()=>{
            setHistory([])
            setLoading(false)
        })
    },[token])

    return (
        <div className="record">
           <Button
           style={{ top:0,left:0,position:"absolute"}}
                    onClick={useHistory().goBack}>
                <ArrowBack/>
            </Button>
          
             <div className="recordDisplay">
             <h1>Your Prescription</h1>
           {history.map((hist)=>(
               <div className="record-box" key={hist._id}>
               <p>Prescribed by {hist.docId.name} on {new  Date(hist.date).toLocaleDateString()}</p>
           </div>
           )) }
           {loading?<CircularProgress/>:(!history.length&&<h3>You have not been prescribed by any Doctor</h3>)}

        </div>
       

            <div className="selectViaDate">
                
            </div>
        </div>
    )
}

export default RecordDisplay
