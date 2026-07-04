import { useState } from "react";
import { useAuth } from "./authProvider";
export const EmployerCard=(employer)=>{
    const {first_name,last_name,company,business_email,imgurl}=employer
      const {user,loading,logout,checkAuth}=useAuth()
return (
    <div className="bg-white rounded-xl border-2 shadow-2xl items-center justify-center flex flex-col items-center justify-center gap-10 w-auto h-auto mb-10">
        <img className=" rounded-full border w-40 h-40 mt-2" src={imgurl || "/default-avatar.png"}/>
        <span className="font-italic text-xl p-10">{first_name} {last_name}</span>
        <span  className="font-italic text-xl p-10">{company}</span>
    </div>
)
}