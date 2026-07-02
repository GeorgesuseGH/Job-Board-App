import express from "express"
import {pool} from "./db.js"
import crypto from "node:crypto"
import { Resend } from "resend"
import dotenv from "dotenv";
dotenv.config()
import bcrypt from "bcrypt";

const resend = new Resend(process.env.RESEND_API_KEY);
export const resetRoute=express.Router()



resetRoute.get("/password-reset",(req,res)=>{
res.send("This page will hold the html to send the email to the /api/password-reset page")
})

resetRoute.post("/api/password-reset",async (req,res)=>{
const {email}=req.body
try{
const searchData=await pool.query('SELECT * FROM users WHERE user_email = $1 ',[email])
if(searchData.rows.length==0){
    return res.send("A link got sent ,if the email exist.");
}
const userEmail=searchData.rows[0].user_email;
const userId=searchData.rows[0].user_id;
const rawToken = crypto.randomBytes(32).toString("hex"); 
const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

const insert=await pool.query("INSERT INTO password_resets(user_id,token_hash,expires_at,used) VALUES($1,$2,$3,false)",[userId,hashedToken,new Date(Date.now() + 30 * 60 * 1000)])

if(insert.rowCount > 0){
const resetLink = `http://localhost:5000/reset-password?token=${rawToken}`;
const emailSent=await resend.emails.send({
 from: "onboarding@resend.dev",
  to: userEmail,
  subject: "Reset your password",
  html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
});

return res.send(emailSent)
}
else{
  return  res.send("Something went wrong in the insertion")
}
}
catch(err){
console.log(err)
return res.send("Catched error")
}
})


resetRoute.get("/reset-password",(req,res)=>{
    const {token}=req.query
    if(!token){
        return res.send("Token isnt in the url")
    }

    //should hold the form to set the new password and then it will be sent to /reset-password and while also send the raw token along
    res.send("The reset should be soon after filling and submitting the form , please be patient .")
})


resetRoute.post("/api/reset-password",async (req,res)=>{


    const {token,newPassword}=req.body
    
    if(!token||!newPassword)
{
    return res.send("Token or newPassword got lost , please reenter the link or request a new one")
}
try{
const hashedToken= crypto.createHash("sha256").update(token).digest("hex");
const tokenRow=await pool.query("SELECT * FROM password_resets WHERE token_hash = $1 AND expires_at > Now() AND used = false",[token])
if(tokenRow.rows.length==0){
return res.send("It would seem like the Token already expired, or something isnt right!")
}
const hashNewPass=await bcrypt.hash(newPassword, 10);
const userId=tokenRow.rows[0].user_id
const oldPass=await pool.query("SELECT password_hash from users wehre user_id =$1",[userId])
const insertNewPass=await pool.query('UPDATE users SET password_hash=$1 WHERE user_id = $2',[hashNewPass,userId])
if(insertNewPass.rowCount==0){
    
   const rollback=await pool.query("UPDATE users SET password_hash = $1 WHERE user_id = $2",[oldPass,userId])
    return res.send("Something went wrong with the insertion , please restart the process.")
}
await pool.query("UPDATE password_resets SET used = true WHERE token_hash = $1", [token]);
res.status(200).json({success:true,state:"Password updated"})
}
catch(err){
    console.log(err)
    return res.status(400).send("Something went on?!")
}
})