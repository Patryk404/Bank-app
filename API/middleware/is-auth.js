const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.isAuth = (req,res,next)=>{
    const authtoken = req.get('Authorization');//getting from headers our Authorization token 
    if(!authtoken)
    {
        const error = new Error();
        error.message = "Not authenticated!";
        error.statusCode = 401;
        throw error;
    }
    const token = authtoken.split(' ')[1];// we do it, because before actual token tay keyword 'Bearer '
    let decodeToken;
    try{
        decodeToken = jwt.verify(token,process.env.JWT_Secret);//veryfing is our token validate with our secret which we have in .env file
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
    req.userId = decodeToken.userId;// setting req.userId with this decode token userId 
    next();// and passing into next function in our route
}