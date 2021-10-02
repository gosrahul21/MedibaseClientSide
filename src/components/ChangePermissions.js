import React from 'react'
import './ChangePermissions.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Confirm from './Confirm'

const ChangePermissions= ()=>{
    return <div className="listofusers">
        
        <div className="userAllowed">
            <div className="userAllowed-right">
                {/* avatar */}
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"/>
                <p>Ramesh Surja Keshri<LocalHospitalIcon style={{color:"green"}}/></p>

                {/* name */}
            </div>
            
            <Confirm message={"Do you want to Deny Permission to Ramesh"}>Deny access</Confirm>
        </div>
        <div className="userAllowed">
            <div className="userAllowed-right">
                {/* avatar */}
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"/>
                <p>Ramesh Surja Keshri <LocalHospitalIcon style={{color:"green"}}/></p>

                {/* name */}
            </div>
            
            <Confirm >Deny access</Confirm>
        </div>
        
        <div className="userAllowed">
            <div className="userAllowed-right">
                {/* avatar */}
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"/>
                <p>Ramesh Surja Keshri</p>

                {/* name */}
            </div>
            
            <Confirm>Deny access</Confirm>
        </div>
        <div className="userAllowed">
            <div className="userAllowed-right">
                {/* avatar */}
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"/>
                <p>Ramesh Surja Keshri</p>

                {/* name */}
            </div>
            
            <Confirm>Deny access</Confirm>
        </div>
        <div className="userAllowed">
            <div className="userAllowed-right">
                {/* avatar */}
                <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"/>
                <p>Ramesh Surja Keshri</p>

                {/* name */}
            </div>
            
            <Confirm>Deny access</Confirm>
        </div>
       
        
        
        
    </div>
}

export default ChangePermissions;