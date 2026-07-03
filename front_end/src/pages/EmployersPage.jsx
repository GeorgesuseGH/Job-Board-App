import { useEffect, useState } from "react";
import { EmployerCard } from "../components/employerCard";
import { useAuth } from "../components/authProvider"
import axios from 'axios'
import { Link, Navigate, useNavigate } from "react-router-dom"
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


export function EmployersPage() {
  const [employers, setEmployers] = useState([])
  const [isemployer, setIsemployer] = useState(false)
  const [ft, setft] = useState("")
  const [loc, setLoc] = useState("") 
  const [vers, setVers] = useState("")
  const [lvl, setLvl] = useState("")
  const [employment, setEmployments] = useState("")
  const [jobDetails, setJobDetails] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [user_id,setUserId]=useState("")
  const { user, loading, logout,checkAuth } = useAuth();
  const navigate=useNavigate()
   useEffect(() => {
    if (user && user.isemployer) {
      setIsemployer(true)
      setUserId(user.user_id)
    }
  }, [user])

  useEffect(() => {
    axios.get("http://localhost:5000/employers", { withCredentials: true }).then(res => {

      if (res.data.redirect) {
       navigate("/log-in",{replace:true})
      }

      else if (res.data.length > 0) {
        console.log(user)
        setEmployers(res.data)
      }

     checkAuth()

    })


  }, [])
 

  return user?.user_id ? (
    <div className="flex flex-col gap-4 items-center justify-center">

      {
        isemployer ? (<div className="flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-semibold text-red-700 m-20">Post a job Offer :</h2>

          <form className='rounded-xl border-2 shadow-2xl w-auto h-auto mx-10' onSubmit={(e) => {
            e.preventDefault();

            axios.post("http://localhost:5000/jobs",{jobDetails,phone,email,lvl,employment,vers,ft,loc,user_id}, { withCredentials: true }).then(res=>{
                console.log(res)

                if(res.data.success==false){
                       navigate("/error",{replace:true})
                }
            }).catch(err=>{console.log(err)
              navigate("/error",{replace:true})
            })
            setEmail("")
            setLoc("")
            setLvl("")
            setPhone("")
            setJobDetails("")
            setVers('')
            setft("")
            setEmployments("")
            e.target.reset
          }}>
            <div className='grid sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-10 items-center justify-center my-10'>
              <select required className='bg-white rounded-xl border-black shadow-lg max-h-20 ' id="location" value={loc} onChange={(e) => setLoc(e.target.value)}>
               <option value="" disabled>Select a Country</option>
                {countries.map(location => {
                  return <option key={location.country}>{location.country}</option>
                })}
              </select>

              <select required className='bg-white rounded-xl  border-black shadow-lg ' id="functions" value={ft} onChange={(e) => setft(e.target.value)}>
                              <option value="" disabled>Select a Function</option>

                {functions.map(funct => {
                  return <option key={funct} >{funct}</option>
                })}
              </select>

              <select required className='bg-white rounded-xl border-black shadow-lg ' id="level" value={lvl} onChange={(e) => setLvl(e.target.value)}>
                               <option value="" disabled>Select a Level</option>

                {levels.map(level => {
                  return <option key={level} >{level}</option>
                })}
              </select>

              <select required className='bg-white rounded-xl border-black shadow-lg ' id="versatatility" value={vers} onChange={(e) => setVers(e.target.value)}>
                               <option value="" disabled>Select a Contract Type</option>

                {versat.map(ver => {
                  return <option key={ver}>{ver}</option>
                })}
              </select>

              <select required className='bg-white rounded-xl border-black shadow-lg ' id="employmentType" value={employment} onChange={(e) => setEmployments(e.target.value)}>
                               <option value="" disabled>Select a Employment</option>

                {employmentTypes.map(emp => {
                  return <option key={emp}>{emp}</option>
                })}
              </select>
              <label className="flex flex-row justify-center items-center">Job Details :<textarea required minlength="10"
  maxlength="350" type="text" className="border-1 rounded-xl self-center" value={jobDetails} minLength="20" placeholder="In need of an" onChange={e => {
                setJobDetails(e.target.value)
              }}></textarea></label>

              <label className="flex flex-row justify-center items-center">Email :<input required minlength="10"
  maxlength="30" type="email" className="border-1 rounded-xl self-center" value={email} minLength="12" placeholder="email@gmail.com" onChange={e => {
                setEmail(e.target.value)
              }}></input></label>
              <label className="flex flex-row justify-center items-center">Phone :<input required minlength="5"
  maxlength="20" type="number" className="border-1 rounded-xl self-center" value={phone} placeholder="01788999" onChange={e => {
                setPhone(e.target.value)
              }}></input></label>

            </div>
            <div className="flex justify-center">
          <button type="submit" className='bg-linear-to-tl from-primary w-20 h-10 m-5 via-secondary to-primary rounded-xl border-1 shadow-lg hover:shadow-2xl hover:font-semibold' >Post</button>

            </div></form>




        </div>) : (<></>)
      }
      <h1 className='text-red-700 m-30 text-2xl font-bold'>Our Employers</h1>
      <div className={employers.length > 0 ? "grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center" : "flex flex-col justify-center items-center"}>
        {employers.length > 0 ? (employers.map(employer => <EmployerCard key={employer.user_id} {...employer} />)) : (<p className="flex flex-row items-center justify-center bg-white text-xl font-semibold rounded-md shadow-2xl p-5 m-5 h-20">There is no current employer.</p>)}
      </div>
    </div>
  ) : (<Navigate to="/log-in" replace></Navigate>)
}