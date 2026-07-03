import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
export const ResetPass = () => {
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(true)

    return (
        <div className="flex flex-col justify-center items-center">
            {show ? (<div ><h1 className="text-2xl font-serif my-15 self-center">Reset Pass</h1>
                <div  >
                    <form className="grid grid-cols-1 gap-4 p-2 my-2 rounded-xl border-2 items-center " onSubmit={e => {
                        setShow(false)
                        e.preventDefault();
                        axios.post("http://localhost:5000/api/password-reset", { email }, { withCredentials: true }).then(res => console.log(res)).catch(err => {
                            console.log(err)
                            alert("Something went wrong please reload the page.")
                        })
                    }} >
                        <label>Email :
                            <input className="rounded-xl border-2" required value={email} type="email" onChange={e => {
                                setEmail(e.target.value)
                            }}></input></label>
                        <button type="submit" className="rounded-xl border-2 bg-linear-to-tl from-primary via-secondary to-primary">Send</button>
                    </form>
                </div></div>) : (<p className="w-auto p-10 h-auto flex flex-row justify-center self-center border-2 rounded-xl my-10">A link was sent ,if the email exist. </p>)}
        </div>
    )
}

export const SetNewPass = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPass, setNewPass] = useState("")
    const [confirm, setConfirm] = useState('')
    const [sendable, setSendable] = useState(false)
     const navigate=useNavigate()
    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-red-700 text-2xl ">Set new password</h1>
            <form className="border-2 rounded-xl shadow-2xl flex flex-col justify-center items-center gap-10 m-10" onSubmit={e => {
                e.preventDefault();
                if (newPass === confirm) {
                    setSendable(true)
                    axios.post("http://localhost:5000/api/reset-password", { newPass, token }, { withCredentials: true }).then(res => {
                        if (res.data.success==true){
                            navigate("/log-in",{replace:true})
                        }
                        else{
                            navigate("/error",{replace:true})
                        }
                    }).catch(err => console.log(err))
                }
                else {
                    setSendable(false)
                    alert("Please make sure its the same password in both fields !")
                }

            }}><label className="flex flex-row justify-items items-center m-5">New Password :
                    <input onChange={e => setNewPass(e.target.value)} type="password" minLength="12" required className={sendable ? "rounded-xl border-2 border-green-700" : "rounded-xl border-2 border-red-700"} value={newPass} autoComplete='new-password'></input></label>
                <label  className="flex flex-row justify-items items-center  m-5">Confirm new Password :
                    
                    <input onChange={e => setConfirm(e.target.value)} type="password" minLength="12" required className={sendable ? "rounded-xl border-2 border-green-700" : "rounded-xl border-2 border-red-700"} value={confirm}></input></label>
               <div className="flex flex-row items-center justify-center m-5">
                <button disable={sendable} type="submit" className="rounded-xl border-2 bg-linear-to-tl from-primary via-secondary to-primary w-20">Set</button>
           </div> </form>
        </div>
    )
}