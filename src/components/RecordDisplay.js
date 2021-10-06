import React,{useState,useEffect} from 'react'
import './RecordDisplay.css'
import axios from 'axios'
import config,{path} from '../config'

function RecordDisplay() {

    //fetch the records and render the records
    const [history,setHistory] = useState([])
    const token = localStorage.getItem('token_id')
    useEffect(()=>{
        axios.get(`${path}/history`,{headers:{token}})
        .then(({data})=>setHistory(data))
        .catch(()=>setHistory([]))
    },[])

    return (
        <div className="record">
             <div className="recordDisplay">
           {history.map((hist)=>(
               <div className="record-box">
               <p>Appointed by {hist.DocId} on {hist.date}</p>
           </div>
           )) }
           {!history.length&&<h1>You have not been prescribed by any Doctor</h1>}

        </div>
       

            <div className="selectViaDate">
                
            </div>
        </div>
    )
}

export default RecordDisplay
