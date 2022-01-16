import React,{useState,useEffect} from 'react'
import { Input } from '@material-ui/core'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { GET_NORM_USER_ABOUT } from '../../actions/actionTypes'
import {toast} from 'react-toastify'

export default function PatientAboutEdit() {

    const [name,setName] = useState("")
    const [dob,setDob] = useState("")
    const [contactNo,setContact] = useState("")
    const [gender,setGender] = useState("")
    const token = localStorage.getItem('token_id')
    const dispatch = useDispatch()
    const history = useHistory();
    const patient = useSelector(({patient})=>patient)
    
    useEffect(()=>{
        if(patient){
            const {name,DOB,contactNo,gender} = patient
            setName(name)
            setDob(DOB)
            setContact(contactNo)
            setGender(gender)
        }

    },[patient])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!patient)
        return axios.post(`${process.env.REACT_APP_API}/patient/`,{
            name,
            DOB:dob,
            gender,
            contactNo
        },{headers:{token}})
        .then(({data})=>{
            
            dispatch({
                type:GET_NORM_USER_ABOUT,
                payload:data
            })
            toast('Profile created')
        }).catch(({data})=>{
            toast('Profile Update failed!',{type:"error"})
        })
        //UPDATING THE PROFILE OF THE USER
        return axios.put(`${process.env.REACT_APP_API}/patient/${patient._id}`,{
            name,
            DOB:dob,
            gender,
            contactNo,
            

        },
        {headers:{token}}).then(({data})=>{
           //dispatch the updated profile
            // console.log(data)
            toast('Profile Updated !!')
            dispatch({
                type:GET_NORM_USER_ABOUT,
                payload:data
            })
            history.goBack()
        }).catch(({data})=>{
            toast('Profile Update failed!',{type:"error"})
            console.log(data)
        })

        

        
    }
    return (
        <div>
            <form className="about__form" onSubmit={onSubmitHandler}>
                <h2>About</h2>
                <Input 
                    onChange={(e)=>setName(e.target.value)} 
                    value={name} className="input__mui" 
                    type="text" 
                    placeholder = "Enter Name"
                />
                {/* <label for="cars">Sex:</label> */}

                <select 
                    style = {{padding:"10px" ,width:"400px", outline:"none"}}
                    name="gender" 
                    id="gender"
                    onChange={(e)=>{setGender(e.target.value)}}
                    value={gender}
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
                <Input 
                    className="input__mui" 
                    type="text" 
                    placeholder="enter phone no."
                    onChange={(e)=>setContact(e.target.value)}
                    value={contactNo}
                />
                <Input 
                    className="input__mui" 
                    type="date" 
                    placeholder="Date of Birth"
                    onChange={(e)=>setDob(e.target.value)}
                    value={dob}
                />
                {/* <div className="address">
                    <Input type="text" placeholder = "Pincode"/>
                    <input type = "text" placeholder = "District"/>
                    <input type = "text" placeholder="Address"/>
                    <input type = "text" placeholder = "City/Village"/>
                </div> */}
                

                    
                    
                   

                <button 
                    style={{cursor:"pointer" ,backgroundColor:"purple",color:"while"}} 
                    type = "submit" 
                    value="Submit"
                    onClick={onSubmitHandler}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
