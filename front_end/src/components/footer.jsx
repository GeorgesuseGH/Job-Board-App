import { useState } from "react";
import { Link } from "react-router-dom";
import {FaInstagram,FaFacebook,FaYoutube,FaTwitter} from "react-icons/fa"
export function Footer(){
    return (
        <div className="w-full h-300 bg-gradient-to-r from-gray-700 via-white to-gray-700 flex flex-col relative">
<div className="self-center w-[50%] h-[70%] mb-30">
    <div className="flex flex-col  relative gap-10">
<img src="/interview.jpg" className="rounded-3xl mt-10 rotate-3"></img>
<img src="/interview(2).jpg" className="rounded-3xl -rotate-5"></img>
</div>
</div>

 <p className="self-center">   
JobHunter © 2026 - Terms - Privacy Policy - Cookie Policy</p>

    
<div className="flex flex-row justify-center gap-10 ml-40 mt-14 bg-white rounded-xl mr-40 w-[30%] self-center p-4 text-center">
      <span className="font-bold">Follow us on :</span>
    <a href="http://instagram.com" className="hover:underline hover:text-primary" >
        <FaInstagram size={30}/>
    </a>
    <a href="http://facebook.com"  className="hover:underline hover:text-primary" >
         <FaFacebook size={30}/>
    </a>
    <a href="http://twitter.com"  className="hover:underline hover:text-primary" >
        <FaTwitter size={30}/>
    </a>
    <a href="http://youtube.com"  className="hover:underline hover:text-primary" >
         <FaYoutube size={30}/>
    </a>
</div>
</div>
    
        
    )
}