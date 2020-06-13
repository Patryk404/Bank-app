const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.isAuth = (req,res,next)=>{
    const authtoken = req.get('Authorization');
    if(!authtoken)
    {
        const error = new Error();
        error.message = "Not authenticated!";
        error.statusCode = 401;
        throw error;
    }
    const token = authtoken.split(' ')[1];
    let decodeToken; 
    try{
        decodeToken = jwt.verify(token,process.env.JWT_Secret);
    }
    catch(err)
    {
        err.statusCode = 500;
        throw err; 
    }
    if (!decodeToken){
        const error = new Error();
        error.message = "Not authenticated!";
        error.statusCode = 401; 
        throw error;
    }
    req.userId = decodeToken.userId;
    next();
}