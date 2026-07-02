import { createContext, useContext, useState, useEffect } from 'react'
import axios from "axios"
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
const checkAuth= async()=>{


      await axios.get("/api/log-in").then(res=>{
        setUser(res.data)
        setLoading(false)
       }).catch(err=>{console.log(err)
          setLoading(false)}
    )
    
}
useEffect(()=>{
    checkAuth()
},[])
    const logout = async () => {
        await axios.post("/api/log-out","", { withCredentials: true }).then(res=>{
            setUser(null)
        })
       
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout ,checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)