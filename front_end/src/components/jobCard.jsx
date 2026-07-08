import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "./authProvider"
import { useNavigate } from "react-router-dom"
export const JobCard = (obj) => {
    
    const { job_details, phone, email, lvl, appliers, job_id, user_id } = obj
    const [applied, setApplied] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [isPoster, setIsPoster] = useState(false)
    const { checkAuth, user, logged, loading } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.user_id && appliers) {



            setApplied(appliers.some(applier => applier == user?.user_id))
        }
        if (user?.user_id == user_id) {
            
            setIsPoster(true)

        }
    }, [])

    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <div className="overflow-hidden shadow-2xl rounded-xl max-w-60 max-h-80 font-sans font-semibold flex flex-col items-center gap-7 m-5 p-5 hover:scale-100 hover:shadow-4xl " >

            <p>Level required : {lvl}</p>
            <p>Details : {job_details?.slice(0, 24)}....</p>
            <p>Phone : {phone}</p>
            <p>Email : {email}</p>
            {user.isemployer ? isPoster ? (<button disabled={deleted} className="bg-linear-to-tl from-red-700 via-secondary to-red-700 my-2 p-2" onClick={() => {
                if(user?.user_id){
                    
                  axios.delete(`http://localhost:5000/job/${job_id}`, { withCredentials: true }).then(res => {
                    if (!res.data.success) {
                        console.log(res)
                        navigate("/error", { replace: true })

                    }
                    else {
                        setDeleted(true)
                    }
                }).catch(err => console.log(err))
                }
                else {
                    navigate("/log-in", { replace: true })
                }
              
            }}>{deleted ? "Deleted" : "Delete"}</button>) : (<button className="bg-linear-to-tl from-primary via-secondary to-primary my-2 p-2" onClick={() => {
                navigate("/employers", { replace: true })
            }}>Want to create a post?</button>) : (<button disabled={applied} className="bg-linear-to-tl from-primary via-secondary to-primary my-2 p-2" onClick={e => {
                if (user?.user_id) {
                    axios.put("http://localhost:5000/add-applier", { job_id: job_id }, { withCredentials: true }).then(res => {
                        if (res.data.success == true) {
                            setApplied(true)
                            return
                        }
                        else {
                            navigate("/error", { replace: true })
                        }
                    })

                }
                else {
                    navigate("/log-in", { replace: true })
                }
            }}>{applied ? "Applied" : "Apply"}</button>)


            }

        </div>
    )
}