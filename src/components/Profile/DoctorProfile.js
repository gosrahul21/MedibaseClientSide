import React from 'react'

function DoctorProfile({targetUser}) {
    return (
        <div className="show_profile scale-up-center">
                <div className="row__header">
                        <h2> About</h2>
                </div>

                <div className="row">
                {/* <h3>Age</h3> <p>{getAge(targetUser.patient.DOB)}</p> */}
                </div>
                <div className="row">
                    <h3>Gender</h3> <p>{targetUser.doctor.gender}</p>
                </div>
                <div className="row">
                    <h3>Contact</h3> <p>{targetUser.doctor.contactNo}</p>
                </div>
                <div className="row">
                <h3>Organization</h3> <p>{targetUser.doctor.organization}</p>
                </div>
                <div className="row">
                <h3>Organization Type</h3> <p>{targetUser.doctor.organization_type}</p>
                </div>
            </div>
            
    )
}

export default DoctorProfile
