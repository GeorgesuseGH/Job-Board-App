import express from "express"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bcrypt from "bcrypt"
dotenv.config();
import { pool } from "./db.js";
import { cookieAuth } from "./cookieAuth.js";
import {upload } from "./upload.js"
export const route = express.Router()


route.get("/sign-up", (req, res) => {
    res.json(req.user)
})


route.get("/api/log-in",cookieAuth ,async (req, res) => {
    res.json(req.user)
})
route.post("/api/log-out",cookieAuth,(req,res)=>{
     res.clearCookie("token")
    res.json({success:true,state:`${req.user.user_id} is logging out`})
})

route.post("/api/log-in", async (req, res) => {

    const { email } = req.body
    const { pass } = req.body             
    // i need to use bcrypt.compare() to check the hashed pass httpOnly
    if (!email || !pass) {
        return res.status(400).json({ success: false, state: "Missing Data" })
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1 ', [email]);
        if(result.rowCount>0){
        const passwordMatch = await bcrypt.compare(pass, result.rows[0].password_hash);

        if (passwordMatch) {
            const token = jwt.sign({ user: result.rows[0] }, process.env.MY_SECRET, { expiresIn: "10m" });
                 
            res.cookie("token", token, { httpOnly: true });
           
            return res.json({success:true,state:"Redirecting to the main page"});
        } else {
            return res.status(400).json({ success: false, user:result.rows[0]});
        }
    }
    else{
        return res.json({success:false,state:"The password or email might be wrong"})
    }

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, state: "error" })
    }
})


route.post("/api/signup",upload.single("image"), async (req, res) => {
    const { isemployer, email, pass, firstName, lastName, phone, country } = req.body
    //I need to store passwords but hashed using bcrypt.hash()//
      const imgUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null; // Creating a url for the location of the file
      console.log(req.body)
    if (isemployer !== undefined && email && pass && firstName && lastName && phone && country) {
       
        
            try { 
                const checkEmail = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
               
        if (checkEmail.rows.length > 0) {
            console.log("It seems like this email already exist , try to log in .")
            return res.redirect("/login")
        }
              else {  const hashedPass = await bcrypt.hash(pass, 10)
                const insertInDb = await pool.query('INSERT INTO users(user_email,password_hash,isemployer) VALUES($1,$2,$3) RETURNING user_id', [email, hashedPass, isemployer])
                if (insertInDb) {


                    if (isemployer === "false") {
                        const { birthdate ,experience,studies} = req.body
                        const insertTable = await pool.query('INSERT INTO candidate_info(first_name,last_name,birthdate,country,email,phone,user_id,experience,studies) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [firstName, lastName, birthdate, country, email, phone, insertInDb.rows[0].user_id,experience,studies])
                        if (insertTable.rowCount > 0) {
                            return res.json({success:true,state:"Redirecting so you log in."})
                        }
                        else{
                const removeUser=await pool.query("DELETE FROM users WHERE user_id =  $1 ",[ insertInDb.rows[0].user_id])
                                return res.send("Something went wrong ,the user was removed , Please restart the whole process")

            }

                    }
                    else {
                        const { company } = req.body
                        const insertTable = await pool.query('INSERT INTO employer_info(first_name,last_name,company,country,business_email,phone,user_id,imgurl) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [firstName, lastName, company, country, email, phone, insertInDb.rows[0].user_id,imgUrl])
                        if (insertTable.rowCount > 0) {
                            return res.send("success ,redirecting to the login page")
                        }
                         else{
                const removeUser=await pool.query("DELETE FROM users WHERE user_id =  $1 ",[ insertInDb.rows[0].user_id])
                return res.send("Something went wrong ,the user was removed , Please restart the whole process")
            }
                    }

                }
            
            
            }
            }
            catch (err){

                console.log(err)
                return res.status(400).json({ success: false, state: "Insertion failed" })


            }
       
    }
    else {
        return res.status(400).send("Missing data error")
    }
})

route.get("/user-profile", cookieAuth, (req, res) => {
    res.send("user profile page")
})

