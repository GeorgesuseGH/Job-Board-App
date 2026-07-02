import jwt from "jsonwebtoken"

export const cookieAuth = async (req, res, next) => {

   try {
      const user =await jwt.verify(req.cookies.token, process.env.MY_SECRET)
      const { password_hash, ...safeData } = user.user
      req.user = safeData
      next()
   }
   catch (err) {
      res.clearCookie("token");
      res.json({ success: false, state: "redirection needed", redirect: `/log-in?returnTo=${encodeURIComponent(req.originalUrl)}` })// redirects path that the user was trying to reach (req.originalUrl) ,using encodeURIComponent makes it so its safe to put in a string
   }
}

//Used at each request to check the authenthicity of the user who is trying to enter that url