import express from "express"
import {pool} from "./db.js"
import { cookieAuth } from "./cookieAuth.js";


export const employerRoute=express.Router();

employerRoute.get("/employers",cookieAuth, async (req,res)=>{
    try{
const getEmployers=await pool.query("SELECT * FROM employer_info")
if(getEmployers.rowCount>0){
   return res.send(getEmployers.rows)
}
else{
return res.json({success:false,state:"Couldn't retrieve the data."})
}
    }
    catch(err){
        console.log(err)
    }
})

