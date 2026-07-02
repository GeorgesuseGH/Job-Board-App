import { useEffect } from "react"
import { useLocation } from "react-router-dom"
// this is just a sideEffect component

export const ScrollTop=()=>{
    const {pathname}=useLocation()
    useEffect(()=>{
window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    },[pathname]);
    return null
}