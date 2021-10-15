import React from 'react'
// import axios from 'axios'
import './Home.css'


function Home() {

    // const token = localStorage.getItem('token_id')
    // useEffect(()=>{
    //     axios.get(`${process.env.REACT_APP_API}/doctor/all`,{headers:{token}}).then(({data})=>{
        
    //     }).catch((err)=>setDoctors([]))
    // },[token])


    return (
        <div className="Home">
            {/* fetch doctors
            {
               doctors.length? doctors.map(({name,avatar})=>{
                    return <Card name={name} avatar={avatar}/>
                }):null
            } */}
        </div>
    )
}


export default Home;
