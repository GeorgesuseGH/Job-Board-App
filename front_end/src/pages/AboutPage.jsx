import { useState } from "react";
import {FaGithub} from "react-icons/fa"

export function AboutPage(){
return(    <div className='flex flex-col  justify-center items-center font-sans relative top-[-10px] '>        <h1 className="text-red-700 m-30 text-2xl font-bold">About us page </h1>

        <p className="m-5 p-3 self-center">
There isnt anything much here, just built this as  a project to add to my CV.
        </p>

        <a href="https://github.com/GeorgesuseGH"><FaGithub size={30}/></a>

        </div>
    )
}