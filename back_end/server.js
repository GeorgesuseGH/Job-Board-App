import express from "express"
import jwt from 'jsonwebtoken';
import { pool } from "./db.js"
import { route } from "./log_signIn.js"
import { cookieAuth } from "./cookieAuth.js"
import cookieParser from "cookie-parser";
import { jobRoute } from "./jobUrl.js";
import { resetRoute } from "./forgotPass.js";
import cors from "cors"
import { employerRoute } from "./employer.js";
import { upload } from "./upload.js";
import path from "path"
import multer from "multer";
import session from "express-session"
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = express()

server.use(cors({origin: "http://localhost:5173", // your Vite dev URL
    credentials: true   }))   // allow all origins (fine for local dev)


server.use(session({
  secret: process.env.MY_SECRET, // put in .env
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }  // for 1 day
}))
server.use(cookieParser());
server.use(express.json()); // Parse JSON bodies
//server.use(cookieAuth) use for needed authentication
server.use(route)


server.use(jobRoute)
server.use("/uploads", express.static(path.join(process.cwd(), "uploads")))
server.use(resetRoute)
server.use(employerRoute)
server.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

server.use(express.static(path.join(__dirname,"../front_end/dist")))
server.get("/error", (req, res) => {
  res.json({ statusCode:req.statusCode,state: "error" })
})

server.get("*anyname",(req,res)=>{
  res.sendFile(path.join(__dirname,"../front_end/dist","index.html"))
})
server.listen(5000, () => {
  console.log("hello world")
})