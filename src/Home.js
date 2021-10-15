import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Card from './Card'
import './Home.css'


function Home() {
    const [doctors,setDoctors] = useState([])
    const token = localStorage.getItem('token_id')
    useEffect(()=>{
        axios.get('http://localhost:8000/doctor/all',{headers:{token}}).then(({data})=>{
            setDoctors(data)
        }).catch((err)=>setDoctors([]))
    },[token])


    return (
        <div className="Home">
            {/* fetch doctors */}
            {
                doctors.map(({name,avatar})=>{
                    return <Card name={name} avatar={avatar}/>
                })
            }
        </div>
    )
}


export default Home;
