import {useState,useEffect} from "react"
import axios from "axios"
export const JobCard=(obj)=>{
    const {job_details,phone,email,lvl}=obj
    
    
    return (
        <div className="overflow-hidden shadow-2xl rounded-xl max-w-60 max-h-80 font-sans font-semibold flex flex-col items-center gap-7 m-5 p-5 hover:scale-100 hover:shadow-4xl " >
            <p>Level required : {lvl}</p>
            <p>Details : {job_details}</p>
            <p>Phone : {phone}</p>
            <p>Email : {email}</p>
            </div>
    )
}