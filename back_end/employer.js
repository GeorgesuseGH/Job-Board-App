import express from "express"
import { pool } from "./db.js"
import { cookieAuth } from "./cookieAuth.js";


export const employerRoute = express.Router();

employerRoute.get("/employers", cookieAuth, async (req, res) => {
    try {
        const getEmployers = await pool.query("SELECT * FROM employer_info")
        if (getEmployers.rowCount > 0) {
            return res.send(getEmployers.rows)
        }
        else {
            return res.json({ success: false, state: "Couldn't retrieve the data." })
        }
    }
    catch (err) {
        console.log(err)
    }
})

employerRoute.get("/employer", cookieAuth, async (req, res) => {
    const { user_id } = req.user
    try {
        const employerInfo = await pool.query("SELECT * FROM employer_info WHERE user_id = $1", [user_id])
        if (employerInfo.rowCount > 0) {
            return res.json({ success: true, data: employerInfo.rows[0] })
        }
        else {
            return res.json({ success: false, state: err })

        }
    }
    catch (err) {
        return res.json({ success: false, state: err })
    }

})
