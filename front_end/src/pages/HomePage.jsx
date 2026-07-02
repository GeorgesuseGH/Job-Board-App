import { useState, useEffect, useRef, useMemo } from 'react'
import { JobCard } from '../components/jobCard'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useAuth } from '../components/authProvider';
const countries = [
  { country: "Lebanon", code: "+961" },
  { country: "United States", code: "+1" },
  { country: "Canada", code: "+1" },
  { country: "United Kingdom", code: "+44" },
  { country: "France", code: "+33" },
  { country: "Germany", code: "+49" },
  { country: "Italy", code: "+39" },
  { country: "Spain", code: "+34" },
  { country: "Turkey", code: "+90" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "United Arab Emirates", code: "+971" },
  { country: "Qatar", code: "+974" },
  { country: "Kuwait", code: "+965" },
  { country: "Egypt", code: "+20" },
  { country: "Jordan", code: "+962" },
  { country: "Syria", code: "+963" },
  { country: "Iraq", code: "+964" },
  { country: "Australia", code: "+61" },
  { country: "India", code: "+91" },
  { country: "China", code: "+86" },
  { country: "Japan", code: "+81" },
  { country: "South Korea", code: "+82" },
  { country: "Brazil", code: "+55" },
  { country: "Mexico", code: "+52" },
  { country: "South Africa", code: "+27" }
];
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

export function HomePage() {
  const [ft, setft] = useState("")
  const [loc, setLoc] = useState("")
  const [vers, setVers] = useState("")
  const [lvl, setLvl] = useState("")
  const [employment, setEmployments] = useState("")
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const {user,loading,logout,checkAuth}=useAuth()
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:5000/jobs").then(res => {
      setJobs(res.data)
      setFilteredJobs(res.data)
      if (res.data.length > 4) {
        setFilteredJobs(res.data.slice(0, 4))
      }

      console.log(res.data)
    }
    ).catch(err => console.log(err))

    checkAuth()
    if(user){
      setLogged(true)
    }
    else{
      setLogged
    }
  }, [])

  useEffect(() => {
    if (ft || loc || vers || lvl || employment) {
      const timeIn = setTimeout(() => {
        const newFiltered = jobs.filter(job =>
          (!loc || job.loc === loc) &&
          (!vers || job.versat === vers) &&
          (!ft || job.ft === ft) &&
          (!employment || job.employment === employment)
        )

        if (newFiltered.length > 4) {
          setFilteredJobs(newFiltered.slice(0, 4))
        }
        else {
          setFilteredJobs(newFiltered)
        }

      }, 1200)
      return () => clearTimeout(timeIn)
    }
    else {
      setFilteredJobs(jobs)
      return
    }


  }, [ft, loc, vers, lvl, employment])
  return (

    <div className='flex flex-col  justify-center items-center font-sans relative top-[-10px] '>
      <p className='text-red-700 m-30 text-2xl font-bold'>Having a hard time finding a job?<span className='text-green-300'> We are welcome to make your search easier.</span></p>

      <div className='bg-gradient-to-tl from-primary  via-secondary to-primary min-w-[150px] min-h-[200px] w-[86%]  flex flex-col justify-center items-center rounded-xl'>

        <div className=' w-[70%] h-[95%] flex flex-col justify-center items-center'>

          <form onSubmit={(e) => {
            e.preventDefault();
          }}>
            <div className='grid sm:grid-cols-2 md:grid-cols-5 md:grid-rows-2 gap-6 items-center justify-center mt-10'>
              <select className='bg-white rounded-xl border-black shadow-lg ' id="location" value={loc} onChange={(e) => setLoc(e.target.value)}>
                <option value="" disabled>Select a Country</option>
                {countries.map(location => {
                  return <option key={location.country}>{location.country}</option>
                })}
              </select>

              <select className='bg-white rounded-xl  border-black shadow-lg ' id="functions" value={ft} onChange={(e) => setft(e.target.value)}>
                <option value="" disabled>Select a Function</option>

                {functions.map(funct => {
                  return <option key={funct} >{funct}</option>
                })}
              </select>

              <select className='bg-white rounded-xl border-black shadow-lg ' id="level" value={lvl} onChange={(e) => setLvl(e.target.value)}>
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
            </div>
            <div className='flex justify-center my-10'>
              <button type="submit" className='bg-white rounded-xl border-black shadow-lg  hover:shadow-3xl hover:font-bold'>Search</button>
            </div></form>

        </div>
        {
          filteredJobs.length > 0 ? (<div id="job-card-container" className="rounded-xl  grid md:grid-cols-3 sm:grid-cols-1 bg-white h-[80%] w-[80%] mb-10 "> {filteredJobs.map(job => { return <JobCard key={job.job_id} {...job} /> })} {
          logged ? (<Link to="/employers" className='hover:underline hover:text-primary bg-white rounded-xl p-4'>more...</Link>) : (<Link to="/log-in" className='hover:underline  p-4 rounded-xl bg-white hover:text-primary'>more...</Link>)
        }</div>) : (<p className=" bg-white h-[90%] w-[90%] mb-10 font-bold text-xl flex flex-row justify-center items-center">No available job posts</p>)
        }
        

      </div>
    </div>
  )
}


