import React from 'react'
import './About.css'
import {useSelector} from 'react-redux'
import DoctorAboutEdit from './DoctorAboutEdit'
import PatientAboutEdit from './PatientAboutEdit'


function About() {

   
    
    const user = useSelector(({user})=>user)



    return (
        <div className="about">
            {user.role==='doctor'?<DoctorAboutEdit user ={user}/>:<PatientAboutEdit  user ={user}/>}
        </div>
    )
}

export default About
