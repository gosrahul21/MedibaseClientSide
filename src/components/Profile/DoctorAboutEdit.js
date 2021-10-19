import React,{useState,useEffect} from 'react'
import { Input } from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {GET_DOCTOR_ABOUT} from '../../actions/actionTypes'
import {toast} from 'react-toastify'
function DoctorAboutEdit({user,type}) {
    
    const [name,setName] = useState("")
    const [dob,setDob] = useState("")
    const [contactNo,setContact] = useState("")
    const [gender,setGender] = useState("")
    const [organizationName,setOrganizationName] = useState("")
    const [organizationType,setOrganizationType] = useState("")
    const token = localStorage.getItem('token_id')
    const doctor = useSelector(state => state.doctor)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!doctor) return;
        const {name, DOB,contactNo,gender,organization,organization_type} = doctor
        setName(name)
        setDob(DOB)
        setContact(contactNo)
        setGender(gender)
        setOrganizationName(organization)
        setOrganizationType(organization_type)
    },[doctor])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!doctor)
        return axios.post(`${process.env.REACT_APP_API}/doctor`,{
            name,
            DOB:dob,
            gender,
            contactNo,
            organization:organizationName,
            organization_type:organizationType

        },
        {headers:{token}}).then(({data})=>{
           
            dispatch({
                type:GET_DOCTOR_ABOUT,
                payload:data
            })
            history.push('/')
            toast('Profile Created',{type:"success"})
            //add remaining details in state
        }).catch(({data})=>{
            console.log(data)
        })

        toast.promise( axios.put(`${process.env.REACT_APP_API}/doctor/${doctor._id}`,{
            name,
            DOB:dob,
            gender,
            contactNo,
            organization:organizationName,
            organization_type:organizationType

        },{headers:{token}})
        .then(({data})=>{
          dispatch({
                type:GET_DOCTOR_ABOUT,
                payload:data
            })
            history.goBack()
            // toast('Profile Updated',{type:"success"})
            //add remaining details in state
        }),
        {
            pending: 'Updating the Profile!',
            success: 'Profile Updated 👌',
            error: 'Profile updatation failed 🤯'
          })
       
       
    }


    return (
        <div>
             <form className="about__form" onSubmit={onSubmitHandler}>
                <h2>About</h2>
            
                <Input 
                    onChange={(e)=>setName(e.target.value)} 
                    value={name} className="input__mui" 
                    id='name'
                    type="text" 
                    placeholder = "Enter Name"
                    required={true}
                />
                {/* <label for="cars">Sex:</label> */}

                <select 
                    style = {{padding:"10px" ,width:"400px", outline:"none"}}
                    name="gender" 
                    id="gender"
                    onChange={(e)=>{setGender(e.target.value)}}
                    value={gender}
                    required={true}
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
                    required={true}
                />
                <div className="dob">
                    <span >Enter DOB:</span>
                    <Input 
                        className="input__mui" 
                        type="date" 
                        id="dob"
                        placeholder="Date of Birth"
                        onChange={(e)=>setDob(e.target.value)}
                        value={dob}
                        required={true}
                    />
                </div>
                
                {/* <div className="address">
                    <Input type="text" placeholder = "Pincode"/>
                    <input type = "text" placeholder = "District"/>
                    <input type = "text" placeholder="Address"/>
                    <input type = "text" placeholder = "City/Village"/>
                </div> */}
                <Input 
                    onChange={(e)=>setOrganizationName(e.target.value)} 
                    value={organizationName} className="input__mui" 
                    type="text" 
                    placeholder = "Organization/Clinic Name"
                    required={true}
                />
                <select 
                    style = {{padding:"10px" ,width:"400px", outline:"none"}}
                    name="organization_type" 
                    id="organization_type"
                    onChange={(e)=>{setOrganizationType(e.target.value)}}
                    value={organizationType}
                    required={true}
                    >
                    <option value="">Organization Type</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="others">Others</option>
                </select>
                   

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

export default DoctorAboutEdit
