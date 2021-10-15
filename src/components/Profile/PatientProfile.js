import React from 'react'
import './PatientProfile.css'
function PatientProfile() {
    return (
        
            <div className="show_profile">
                <div className="row__header">
                        <h2> About</h2>
                </div>

                <div className="row">
                    <h3>Age</h3> <p>23</p>
                </div>
                <div className="row">
                    <h3>Gender</h3> <p>Male</p>
                </div>
                <div className="row">
                    <h3>Contact</h3> <p>7004572140</p>
                </div>

            </div>
            
        
    )
}

export default PatientProfile
