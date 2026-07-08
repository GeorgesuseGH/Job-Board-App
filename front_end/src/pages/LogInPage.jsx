import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authProvider";

export function LogInPage() {
   
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
   const {user,loading,logout,checkAuth}=useAuth()
     const navigate = useNavigate();

    
    useEffect(() => {
        checkAuth();
    }, []);

    const postData = async (url, data) => {

        
        try {
            const res = await axios.post(url, data, { withCredentials: true });
            if (res.data.success) {
                await checkAuth();              
                navigate("/", { replace: true }); 
            } else {
                navigate("/error", { replace: true });
            }
        } catch (err) {
            console.log(err);
            navigate("/error", { replace: true });
        }
    }
    return  user?.user_id ?(
        <div className = " flex flex-col justify-center items-center my-10 ">
            <h1 className = "text-red-700 text-2xl font-bold">You are already logged in , do you wanna log out?</h1>
            <div className = "flex flex-row justify-between items-center w-50 h-50 m-7">
                <button className = " bg-red-500 font-semibold shadow-xl p-2 rounded-xl hover:shadow-xl h-10 w-20" onClick={logout}>Yes</button>
                            


            </div>
        </div>
    ): (<div className="flex flex-col gap-10 items-center justify-center my-10">
        <h1 className="text-2xl font-serif my-15 self-center">LogIn page </h1>
        
            <form className=" border-2 p-10 flex flex-col flex-wrap-reverse gap-10 w-[50%] h-[30%] items-center gap-10 justify-center shadow-2xl" onSubmit={(e) => {
                e.preventDefault();
                postData("http://localhost:5000/api/log-in", { email, pass })

            }}><label className="w-100%">Email: <input required autoComplete="email" className=" rounded-md border-3 p-3 " type="email" value={email} onChange={(e) => {

                setEmail(e.target.value)
            }}></input></label>
                <label>Password: <input  autoComplete="current-password"  className=" rounded-md border-3 p-3 " type="password" value={pass} onChange={(e) => {
                    

                    setPass(e.target.value)
                }} required></input></label>
                <button type="submit" className="bg-gradient-to-tl from-primary via-secondary to-primary border-2 rounded-md w-30 justify-self-center ">Submit</button>
            </form>
            <Link to="/Reset-pass" className="hover:underline text-red-600">Reset password?</Link>

    </div>
    )
}