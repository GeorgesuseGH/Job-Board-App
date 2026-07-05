import {useState,useEffect} from "react"
import axios from "axios"
import { useAuth } from "./authProvider"
import { useNavigate } from "react-router-dom"
export const JobCard=(obj)=>{
    const {job_details,phone,email,lvl}=obj
    const [applied,setApplied]=useState(false)
    const {checkAuth,user,logged,loading}=useAuth()
    const navigate=useNavigate()
    useEffect(()=>{
      checkAuth()
    },[])
    return (
        <div className="overflow-hidden shadow-2xl rounded-xl max-w-60 max-h-80 font-sans font-semibold flex flex-col items-center gap-7 m-5 p-5 hover:scale-100 hover:shadow-4xl " >
            <p>Level required : {lvl}</p>
            <p>Details : {job_details}</p>
            <p>Phone : {phone}</p>
            <p>Email : {email}</p>
            <button disabled={applied} className="bg-linear-to-tl from-primary via-secondary to-primary" onClick={e=>{
               if(user.isemployer){
                navigate("/employers",{replace:true})
               }
               else{
                setApplied(true)
                axios.post("")
               }
            }}>{applied?Apply:Applied}</button>
            </div>
    )
}