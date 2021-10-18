import React from 'react'
import './PatientProfile.css'



function PatientProfile({targetUser}) {
    if(targetUser.role==='doctor') return null

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    

    return (
        
            <div className="show_profile">
                <div className="row__header">
                        <h2> About</h2>
                </div>

                <div className="row">
                    <h3>Age</h3> <p>{getAge(targetUser.patient.DOB)}</p>
                </div>
                <div className="row">
                    <h3>Gender</h3> <p>{targetUser.patient.gender}</p>
                </div>
                <div className="row">
                    <h3>Contact</h3> <p>{targetUser.patient.contactNo}</p>
                </div>

            </div>
            
        
    )
}

export default PatientProfile
