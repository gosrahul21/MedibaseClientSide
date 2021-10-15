import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import PatientProfile from './components/Profile/PatientProfile'
import ShowPrescription from './components/Profile/ShowPrescription'
import AddMedicalRepo from './components/AddMedicalRepo'
import RecordDisplay from './components/RecordDisplay'
import ShowDetailedPres from './components/ShowDetailedPres'
function RenderProfileRoute({email,userId,type}) {
    // const {email} = useParams()

    return (
       
            <BrowserRouter>
            <Switch>
            <Route exact  path='/:email/addrepo'> <AddMedicalRepo userId={userId}/> </Route>
            <Route exact path="/record"><RecordDisplay/></Route>
            <Route exact path='/detailed-pres/:id'><ShowDetailedPres/></Route>
            <Route exact path=''>
               
                <PatientProfile/> 
                <ShowPrescription type={type} userId={userId} email={email}/>
            </Route>
           
            </Switch>
            
           </BrowserRouter>

    )
}

export default RenderProfileRoute
