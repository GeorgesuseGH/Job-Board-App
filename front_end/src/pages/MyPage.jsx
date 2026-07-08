import { useEffect, useState } from "react"
import { useAuth } from "../components/authProvider"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { JobCard } from "../components/jobCard"



const Employer=(info)=>{
  const navigate=useNavigate()
  const [myPosts,setMyPosts]=useState(null)
  useEffect(()=>{
     axios.get("http://localhost:5000/my-offers").then(res=>{
        if(res.data&&res.data.success){
       setMyPosts(res.data.data)
       return
        }
         else if(res.data.state=="error"){
         navigate("/error",{replace:true})
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
  },[])
 const {first_name,last_name,company,business_email,phone,imgurl}=info
  
return (
  <div className="flex flex-col justify-center items-center rounded-xl shadow-2xl">
    <img src={imgurl} alt={`${first_name} ${last_name}`} className="rounded-full m-5"></img>
<h2 className="text-xl shadow-xl m-5">{first_name} {last_name}</h2>
<p><strong>Company :</strong>{company}</p>
<p>
 <strong>Business Email</strong> : {business_email}
</p>
<strong>My Posts :</strong>
{!myPosts ? (
  <p>There might not be any posts...</p>
) : myPosts.length === 1 ? (
  <div className="flex flex-row justify-center items-center sm:flex-col">
    <JobCard key={myPosts[0].job_id} {...myPosts[0]} />
  </div>
) : (
  <div className="grid md:grid-cols-2 sm:grid-cols-1 items-center justify-center">
    {myPosts.map(post => (
      <JobCard key={post.job_id} {...post} />
    ))}
  </div>
)}
  </div>
)
}


const Candidate=(info)=>{
 
   const {first_name,last_name,email,phone,experience,studies,birthdate}=info

  return( <div className="flex flex-col justify-center items-center gap-7 m-10">
   
<p className="text-xl shadow-xl m-5">{first_name} {last_name}</p>
<p><strong>Studies </strong>:{studies}</p>
<p>
 <strong>Birthday :</strong> {birthdate?.split("T")[0]}
</p>
<p className="m-5"><strong>Experience : </strong>
{experience}
</p>
  </div>)
}

export const MyPage=()=>{


const [myInfo,setMyInfo]=useState([])
const {user,logout,loading,checkAuth}=useAuth()
const navigate=useNavigate()
const {user_id,isemployer}=user||{}

    useEffect(()=>{if(user_id||isemployer!=undefined){if(isemployer){
         axios.get("http://localhost:5000/employer").then(res=>{
        if(res.data&&res.data.success){
       setMyInfo(res.data.data)
        }
        else{
         navigate("/error",{replace:true})
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
    }
    else{
 axios.get("http://localhost:5000/candidates").then(res=>{
        if(res.data&&res.data.success){
       setMyInfo(res.data.data)
        }
         else{
         navigate("/error",{replace:true})
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
    }}else{
       navigate("/log-in",{replace:true})
    }
     
    },[])



    useEffect(()=>{
        checkAuth()
    },[])
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-red-700 text-2xl m-10">My Page</h1>
 {!loading?isemployer?<Employer {...myInfo}/>:<Candidate {...myInfo}/>:<p>Still Loading.....</p>}
        </div>
    )

}

