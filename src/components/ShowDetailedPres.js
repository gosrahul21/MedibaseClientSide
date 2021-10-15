
import React,{useState,useEffect} from 'react';
import {Button} from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'
import './ShowDetailedPres.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import ImageList from './ImageList'
import {useParams} from 'react-router-dom'

const ShowDetailedPres = () => {

    const {id} = useParams()
    const [medHistory,setmedHistory] = useState(null)
    const token = localStorage.getItem('token_id')

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/history/medDetail/${id}`,{headers:{token}}).then(({data})=>{
      setmedHistory(data);
    }).catch(({data})=>{
      console.log(data)
    })

    return ()=>{
      setmedHistory(null);
    }
  },[id,token])

 





  return (
    <div className="detailed_prs" style={{position:"relative"}}>
       <Button
           style={{ top:0,left:0,position:"absolute"}}
                    onClick={useHistory().goBack}>
                <ArrowBack/>
            </Button>
      {medHistory&&<div className="pres__left">
        <div className="med">
         <h4>Date:</h4>  {new Date(medHistory.date).toLocaleDateString()}
        </div>
          <div className="med">
           <h4>Prescribed by:</h4>  {medHistory?.docId.name}
          </div>
          <div className="med">
            <h4>Problem/Disease/Symptom:  </h4>{medHistory.disease}
          </div>
          <div className="med">
            <h4>Medicines</h4>
            <li>
             {medHistory.medicines.map((med,cnt)=>(
              <ul style={{padding:"5px"}} key={cnt}>{med}</ul>
             ))}

             </li>
          </div>
          <div className="med">
            <h4>Haemoglobin:</h4>
            {medHistory.haemoglobin}
          </div>
          <div className="med">
              <h4>Allergies:</h4>
              {medHistory.allergies}
          </div>
          <div className="med">
              <h4>Blood Group:</h4>
              {medHistory.bloodGroup}
          </div>
      </div>}
      {(medHistory&&medHistory.prescription_image.length>0)?<ImageList images={medHistory.prescription_image}/>:null}
    </div>
  );
}


  

export default ShowDetailedPres;