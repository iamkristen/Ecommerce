const jwt = require("jsonwebtoken");

const verify = async (req,res,next)=>{
    const token = req.headers["auth-token"];
    const username = req.headers["username"];

   try {
    
    const result = await jwt.verify(token, "SecretKey");
    

        if(result.username == username){
            next();
            // console.log("Here")
        }
        else
        {
            
        res.json({success:false, error: "Access Denied"});
        }
    
   } catch (error) {
        res.json({success:false, error: "Invalid Token"});
   }


}

module.exports = verify;