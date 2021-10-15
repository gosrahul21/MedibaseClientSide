import React,{useState} from 'react'
import './AddRepo.css'
import {useHistory} from 'react-router-dom'
import { ArrowBack, CloseRounded } from '@material-ui/icons';
import {Button} from '@material-ui/core'
import axios from 'axios'
import { path } from '../config';
import FileUpload from './forms/FileUpload'
export default function AddMedicalRepo({userId}) {
   
    const [medicines,setMedicines] = useState([]);
    const [med,setMed] = useState('');
    const [image,setImage] = useState([])
    const history = useHistory()
    const token = localStorage.getItem('token_id')
    const [state,setState] = useState({
        disease:"",
        prescription_image:null,
        bloodPressure:'',
        bloodGroup:''
    })
    const removeItem = (med)=>{
        setMedicines(medicines.filter((md)=>med!==md))
    }

    const renderMedicines = ()=>{
        return medicines.map((med)=>(
            <div className="med__item">
                <p>{med}</p><CloseRounded onClick={()=>removeItem(med)} fontSize="small"/>
            </div>
        ))
    }


    const onChangeHandler = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler = (e)=>{
 
        axios.post(`${path}/history/${userId}`,{...state,prescription_image:image,medicines},{headers:{token}}).then(({data})=>{ 
 
            history.goBack();
           
        }).catch((error)=>{

            console.log(error.data,error.message)
        })
    }


    const addRepoBody = ()=>(
        <div className="addRepo">
        <input onChange={onChangeHandler}  value={state.disease} name="disease" type="text" placeholder = "diseases / Problems"/>   
        <input name="alergies" onChange={onChangeHandler} placeholder = "Alergies (if any)" type="text" />
        <FileUpload  images={image} setImages={setImage}/>
        
        <input value={med} onChange={(e)=>setMed(e.target.value)} onKeyDown={(e)=>{
                if(e.key==='Enter')
                {
                    if(med!=='')
                    setMedicines([...medicines,med])
                    setMed('');
                }
            }} required placeholder="Enter Medicines (hit enter)" type="text"/>
        <div className="medicines__list">
            
            {medicines.length?renderMedicines():null}
        </div>
       
        <input name="bloodPressure" onChange={onChangeHandler} placeholder = "Blood Pressure" type="text"/>
        <input name="bloodGroup" onChange={onChangeHandler} placeholder="Blood Group" type="text"/>
        <button className='submit-btn' onClick={onSubmitHandler}>
            Prescribe
        </button>

    </div>
    )

    return (
        <div className="addRepo__main">
            
            
               <Button  className="back__link" onClick={history.goBack}>
                    <ArrowBack/> 
                </Button>
            
            
             <h1>Create prescription</h1>
            
           
            {addRepoBody()}
        </div>
       
    )
}
