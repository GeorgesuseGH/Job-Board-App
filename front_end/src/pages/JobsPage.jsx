import { useState, useEffect, useRef, useMemo } from 'react'
import { JobCard } from '../components/jobCard'
import axios from 'axios'
import {Link, useNavigate,Navigate} from "react-router-dom"
import { useAuth } from '../components/authProvider'

const locations = ["Beirut",
  "Mount Lebanon",
  "North Lebanon",
  "Akkar",
  "Baalbek-Hermel",
  "Bekaa",
  "Nabatieh",
  "South Lebanon"]
const functions = ["Sales",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Cybersecurity",
  "Network Engineering",
  "DevOps",
  "UI/UX Design",
  "Product Management",
  "Project Management",
  "Marketing",
  "Digital Marketing",
  "Software Engineering",
  "Customer Support",
  "Human Resources",
  "Finance",
  "Accounting",
  "Business Analysis",
  "Operations",
  "Logistics",
  "Healthcare",
  "Education",
  "Legal",
  "Content Writing",
  "Graphic Design",
  "Construction",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Telecommunications",
  "Administration"]
const levels = ["Internship",
  "Entry Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "Executive"]
export const employmentTypes = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Internship",
  "Freelance",
  "Remote"
];
const versat = ["Remote", "On Site", "Hybrid"]

export function JobsPage() {
  const [ft, setft] = useState("")
  const [loc, setLoc] = useState("")
  const [vers, setVers] = useState("")
  const [lvl, setLvl] = useState("")
  const [employment, setEmployments] = useState("")
  const [jobs, setJobs] = useState([])
const [filteredJobs, setFilteredJobs] = useState([])
const [logged,setLogged]=useState(false)
const navigate=useNavigate()
const {user,loading,logout,checkAuth}=useAuth()
  useEffect(()=>{
axios.get("http://localhost:5000/jobs").then(res=>{
  if(res.data.redirect)
{
         navigate("/log-in",{replace:true})

}  
  
  setJobs(res.data)
  setFilteredJobs(res.data)
  
}
).catch(err=>console.log(err))
  },[])

useEffect(()=>{
if(ft || loc || vers || lvl || employment){
  const timeIn=setTimeout(()=>{
    const newFiltered=   jobs.filter(job =>
            (!loc || job.loc === loc) &&
            (!vers || job.versat === vers) &&
            (!ft || job.ft === ft) &&
            (!employment || job.employment === employment)
          )
        
         
              setFilteredJobs(newFiltered)
          
   
  },1200)
return ()=>clearTimeout(timeIn)
}
else{
 setFilteredJobs(jobs)
 return
}


},[ft,loc,vers,lvl,employment])

useEffect(()=>{
  checkAuth()
},[])
  return user?.user_id?(

    <div className='flex flex-col  justify-center items-center font-sans relative top-[-10px] '>
      <p className='text-red-700 m-30 text-2xl font-bold'>Welcome Job seeker !!</p>
    
      <div className='bg-gradient-to-tl from-primary  via-secondary to-primary min-w-[150px] min-h-[200px] w-[86%]  flex flex-col justify-center items-center rounded-xl'>
        
        <div className=' w-[70%] h-[95%]'>
          <form className='grid grid-cols-6 grid-rows-2 gap-6 items-center justify-center mt-10' onSubmit={(e) => {
            e.preventDefault();
          }}>

            <select className='bg-white rounded-xl border-black shadow-lg ' id="location" value={loc} onChange={(e) => setLoc(e.target.value)}>
              <option value="" disabled>Select a Country</option>
              {locations.map(location => {
                return <option key={location}>{location}</option>
              })}
            </select>

            <select className='bg-white rounded-xl  border-black shadow-lg ' id="functions" value={ft} onChange={(e) => setft(e.target.value)}>
                           <option value="" disabled>Select a Function</option>

              {functions.map(funct => {
                return <option key={funct} >{funct}</option>
              })}
            </select>

            <select className='bg-white rounded-xl border-black shadow-lg ' id="level" value={lvl}  onChange={(e) => setLvl(e.target.value)}>
                            <option value="" disabled>Select a Level</option>

              {levels.map(level => {
                return <option key={level} >{level}</option>
              })}
            </select>

            <select className='bg-white rounded-xl border-black shadow-lg ' id="versatatility" value={vers} onChange={(e) => setVers(e.target.value)}>
                            <option value="" disabled>Select a Contract Type</option>

              {versat.map(ver => {
                return <option key={ver}>{ver}</option>
              })}
            </select>

            <select className='bg-white rounded-xl border-black shadow-lg ' id="employmentType" value={employment} onChange={(e) => setEmployments(e.target.value)}>
                            <option value="" disabled>Select an Employment</option>

              {employmentTypes.map(emp => {
                return <option key={emp}>{emp}</option>
              })}
            </select>


            <button type="submit" className='bg-white rounded-xl border-black shadow-lg  hover:shadow-3xl hover:font-bold' onClick={()=>{

            }}>Search</button>
          </form>

        </div>
       {
  filteredJobs.length > 0? (<div id="job-card container" className="rounded-xl  flex flex-row flex-wrap bg-white h-[80%] w-[80%] mb-10 "> { filteredJobs.map(job=>{return <JobCard key={job.job_id} {...job}/>})} </div>) : (<p className=" bg-white h-[90%] w-[90%] mb-10 font-bold text-xl flex flex-row justify-center items-center">No available job posts</p>)
}
   

      </div>
    </div>
  ):(<Navigate to="/log-in" replace/>)
}


