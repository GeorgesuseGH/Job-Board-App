import { useEffect, useState } from "react"
import { useAuth } from "../components/authProvider"
import {useNavigate} from "react-router-dom"
import axios from "axios"



export const MyPage=()=>{
const [myPost,setMyPost]=useState([])
const [name,setName]=useState("")
const [imgUrl,setImgUrl]=useState("")
const [isemployer,setIsemployer]=useState(false)
const [myApplications,setMyApplications]=useState([])
const {user,logout,loading,checkAuth}=useAuth()
const navigate=useNavigate()
const {user_id,isemployer}=user

    useEffect(()=>{if(isemployer){
         axios.get("http://localhost:5000/my-offers").then(res=>{
        if(res.data&&res.success){
       setMyPost(res.data)
        }
        else{
            console.log(res)
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
    }
    else{
 axios.get("http://localhost:5000/my-applications").then(res=>{
        if(res.data&&res.success){
       setMyApplications(res.data)
        }
         else{
            console.log(res)
        }
      }  ).catch(err=>{
        navigate("/error",{replace:true})
      })
    }
     
    },[])

useEffect(()=>{
      axios.get("http://localhost:5000/employers").then(res=>{
        if(res.data){
            
       setName(res.data.first_name)
       setImgUrl(res.data.imgurl)

        }
        else{
            
        }
      }).catch(err=>{
        navigate("/error",{replace:true})
      })  
    },[])

    useEffect(()=>{
        checkAuth()
    },[])
    return(
        <div>


        </div>
    )

}