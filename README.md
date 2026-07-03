# Job-Board-App
A Job Board App using Node &amp; Express 
It is my first app , i will try to give as much as usefull info as possible .
This app is very simple and friendly to use , the user is Prompted to login by blocking him from getting too much data and redirecting the user to the login page , once the user is logged in he will be able to go around this SPA .
The user could be an employer , which to be one he will have to give some infos about his company and him self ,also a photo profile , that he could edit , and he will have the power to post job offers as much as he wants .
The candidate will not have the privilege of posting job_offers .



# How to start use the app on your local machine :

First of you need to have atleast close versions of these :
- Node.js v.24.16.0
- npm v.11.13.0
- PostgreSQL v.18.3
- For the rest you can just run npm i  in the terminal and all the dependencies will be installed 

Now you need to create your own data-base :
- Check this video if you are new to using databases :
  <video width="400" height="300" src="https://www.youtube.com/embed/KuQUNHCeKCk" 
title="YouTube video player" controls allowfullscreen></video>
- After installing PostgreSQL and logging you have to create a data base then create the tables .
- These are some usefull commands :
 . CREATE DATABASE job_board
  
 . CREATE TABLE users(user_id SERIAL PRIMARY KEY,user_email VARCHAR(100) UNIQUE,password_hash TEXT,isemployer BOOLEAN)
  
 . CREATE TABLE candidate_info(first_name TEXT,last_name TEXT,email VARCHAR(100) PRIMARY KEY,birthdate DATE,phone VARCHAR(100),user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE ,country TEXT)
  
  . CREATE TABLE employer_info(first_name TEXT,last_name TEXT,business_email VARCHAR(100) PRIMARY KEY,company VARCHAR(100),phone VARCHAR(100),user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,country TEXT,imgURL VARCHAR(255))
  
  . CREATE TABLE job_offers(job_details TEXT,job_id SERIAL PRIMARY KEY,phone VARCHAR(100),email VARCHAR(100),lvl TEXT,employment TEXT,versat TEXT,ft TEXT,loc TEXT,user_id INT  REFERENCES users(user_id) ON DELETE CASCADE)
  
  . CREATE TABLE password_resets(id SERIAL PRIMARY KEY,user_id INT  REFERENCES users(user_id) ON DELETE CASCADE,token_hash VARCHAR(200),expires_at TIMESTAMP WITHOUT TIME ZONE,used BOOLEAN)



To access the database from your back_end folder you will have to create a db.js file :

import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "example",
  password: "example",
  host: "localhost",
  port: 5432,
  database: "job_board",
});




Fill the keys with your own info , also to get the port that you are using you need to run "SHOW port" after being logged in to postgres.

Then you will need to add another important file ,the  .env and it should contain:

   MY_SECRET="EXAMPLE"
   RESEND_API_KEY='EXMAMPLE' // you will have to get this after loging in from the resend website 

   
NOTE: Be cautious of adding the .env and db.js to your .gitignore file so if you do want to fork or clone so you do not leak your secret key and password.




NOTE: If you want to use the resend email system on other then your own email that you logged in with in resend.com you will need to have your own domain and verify it on resend.com and use your own email by changing the emailSent varaible created in the forgotPass.js file in the back_end folder,along with all the links to lead to your domain.




When you are ready change directories to your front_end folder and build your dist file :
- npm run build
 And finnaly to start the app you need to go to your back_end folder and type in the terminal :
- node server.js or nodemon server.js 


