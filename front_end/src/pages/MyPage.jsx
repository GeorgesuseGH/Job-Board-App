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
        if(res.data&&res.success){
       setMyPosts(res.data)
        }
         else{
         navigate("/error",{replace:true})
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
  },[])
 const {first_name,last_name,company,business_email,phone,imgurl,post_count}=info
  
return (
  <div className="flex flex-col justify-center items-center">
    <img src={imgurl} alt={`${first_name} ${last_name}`} className="rounded-full m-5"></img>
<h2 className="text-xl shadow-xl m-5">{first_name} {last_name}</h2>
<h3>Company :{company}</h3>
<h4>
 Business Email : {business_email}
</h4>
<h4>Post count : {post_count}</h4>
<div className="grid md:grid-cols-2 sm:gird-cols-1 justify-center items-center">
{
  myPosts ? myPosts.map(post => (
    <JobCard key={post.job_id} {...post} />
  )) : <p>Still fetching...</p>
}
</div>
  </div>
)
}


const Candidate=(info)=>{
  const navigate=useNavigate()
   const {first_name,last_name,email,phone,applications_count,experience,studies,birthdate}=info

  return( <div className="flex flex-col justify-center items-center">
   
<h2 className="text-xl shadow-xl m-5">{first_name} {last_name}</h2>
<h3>Studies :{studies}</h3>
<h4>
 Birthday : {birthdate}
</h4>
<h4>Applications count : {applications_count}</h4>
<p className="grid md:grid-cols-2 sm:gird-cols-1 justify-center items-center"><strong>Experience :</strong>
{experience}
</p>
  </div>)
}
export const MyPage=()=>{


const [myInfo,setMyInfo]=useState([])
const {user,logout,loading,checkAuth}=useAuth()
const navigate=useNavigate()
const {user_id,isemployer}=user||{}

    useEffect(()=>{if(isemployer){
         axios.get("http://localhost:5000/employer").then(res=>{
        if(res.data&&res.data.success){
       setMyInfo(res.data)
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
        if(res.data&&res.success){
       setMyInfo(res.data)
        }
         else{
         navigate("/error",{replace:true})
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
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

