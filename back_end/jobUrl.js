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
  const insertIntoDb=await pool.query("INSERT INTO job_offers(job_details,phone,email,lvl,employment,versat,ft,loc,user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING job_id",[jobDetails,phone,email,lvl,employment,vers,ft,loc,user_id]);
  if(insertIntoDb.rowCount>0){
    const increasePostCount=await pool.query("UPDATE employer_info SET post_count = post_count + 1 WHERE user_id = $1",[user_id])
    if(increasePostCount.rowCount>0){
    return res.json({success:true,state:"Insertion into database complete",data:insertIntoDb.rows[0].job_id})

    }
    else{
      const rollback=await pool.query("DELETE FROM job_offers WHERE job_id = $1",[insertIntoDb.rows[0].job_id])
      return res.json({success:false,state:"Insertion failed,there was a problem with incrementation of post count in some table."})
    }
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

jobRoute.post("/remove-job",cookieAuth,async (req,res)=>{
  const {user_id,job_id}=req.user
  try{

  if(user_id&&job_id){
    const removeJob=await pool.query("DELETE FROM job_offers WHERE job_id = $1 AND user_id = $2",[job_id,user_id])
    if(removeJob.rowCount>0){
      res.json({success:true,state:"Deletation complete."})
    }
    else{
      res.json({success:false,state:"Something mustve happened,there was no job deleted"})
    }
  }
}
catch(err){
  res.json({success:false,state:err})
}
})

jobRoute.get("/my-offers",cookieAuth,async (req,res)=>{
const {user_id}=req.user
try{
const checkPosts=await pool.query("SELECT * FROM job_offers WHERE user_id = $1",[user_id])
if(checkPosts.rowCount>0){
res.json({success:true,state:"sending data",data:checkPosts.rows})
}
else{
   res.json({success:false,state:"Seems like there is no job offers from this user ."})
}
}
catch(err){
  res.json({success:false,state:err})
}
})

jobRoute.get("/candidates",cookieAuth,async(req,res)=>{
  const {user_id}=req.user
  try{
    const checkApplies=await pool.query("SELECT * FROM candidate_info WHERE user_id = $1",[user_id])
    if(checkApplies.rowCount>0){
      res.json({success:true,state:"sending data",data:checkApplies.rows})
    }
    else{
 res.json({success:false,state:"Seems like there is no applications from this user ."})
    }
  }
 catch(err){
  res.json({success:false,state:err})
}
})