import express from "express"
import { cookieAuth } from "./cookieAuth.js";
import { pool } from "./db.js"


export const jobRoute = express.Router();

jobRoute.get("/jobs",async (req, res) => {


  const dbReq =await pool.query("SELECT * FROM job_offers ")
  try {
    if (dbReq.rows.length > 0) {
      res.send(dbReq.rows)
    }
    else{
      res.json({success:false,state:"couldnt get anything from the data"})
    }
  }
  catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, state: "Data wasnt retrieved" })
  }
})

jobRoute.post("/jobs",cookieAuth,async (req, res) => {
const {jobDetails,phone,email,lvl,employment,vers,ft,loc,user_id}=req.body
try{
if(jobDetails!=""&&phone&&email&&lvl&&employment&&vers&&ft&&loc&&user_id)
{
  const insertIntoDb=await pool.query("INSERT INTO job_offers(job_details,phone,email,lvl,employment,versat,ft,loc,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",[jobDetails,phone,email,lvl,employment,vers,ft,loc,user_id]);
  if(insertIntoDb.rowCount>0){
    return res.json({success:true,state:"Insertion into database complete"})
  }
  else{
    return res.json({success:false,state:"Insertion failed"})
  }
}
else{
 return res.json({success:false,state:"Something is etheir missing or is wrong"})
}
}
catch(err){
  console.log(err)
  return res.json({succes:false,state:"Error occured"})
}
})