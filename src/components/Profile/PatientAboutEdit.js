import React,{useState,useEffect} from 'react'
import { Input } from '@material-ui/core'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {path} from '../../config'

export default function PatientAboutEdit() {

    const [name,setName] = useState("")
    const [dob,setDob] = useState("")
    const [contactNo,setContact] = useState("")
    const [gender,setGender] = useState("")
    const token = localStorage.getItem('token_id')


    const patient = useSelector(({patient})=>patient)

    useEffect(()=>{
        axios.get(`${path}/patient`,{headers:{token}})
        .then(({data:{name,DOB,contactNo,gender}})=>{
            setName(name)
            setDob(DOB)
            setContact(contactNo)
            setGender(gender)
           

        }).catch((err)=>{
            console.log(err.data)
        })
    },[token])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!patient)
        return axios.post(`${path}/patient/`,{
            name,
            DOB:dob,
            gender,
            contactNo
        },{headers:{token}})
        .then(({data})=>{
            console.log(data)
        }).catch(({data})=>{
            console.log(data)
        })

        return axios.put(`${path}/patient/${patient._id}`,{
            name,
            DOB:dob,
            gender,
            contactNo,
            

        },
        {headers:{token}}).then(({data})=>{
           //dispatch the updated profile
            console.log(data)
        }).catch(({data})=>{
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
