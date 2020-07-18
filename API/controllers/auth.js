const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatebill} = require('../utils/complicated-bill-generator');
require('dotenv').config();
const {validationResult} = require('express-validator');
module.exports.signup= async (req,res,next) =>{
    const errors = validationResult(req);//if we have some validationerrors 
    if(!errors.isEmpty())//is not empty
    {
        const error = new Error();
        error.message = "Validation failed";
        return next(error);
    }
    const existing_user = await User.findOne({where: {email: req.body.email}});//searching from appropriate email 
    if(existing_user)// if user with this email already exist return error
    {
        const error = new Error();
        error.message = "Email is already taken!";
        error.statusCode = 409;
        return next(error);
    } 
    const hashed_password = await bcrypt.hash(req.body.password,12);//hashing password
    req.body.password = hashed_password;
    const user = await User.create({// creating user in our database
        ...req.body,
        bill: generatebill()
    });
    res.status(201).json({
        message: "Succesfully created a user in our bank! Welcome "+user.dataValues.name.toString()+"!",
    });
}
module.exports.login = async (req,res,next)=>{
    const email = req.body.email.replace(/\s/g,'');
    const login = req.body.login.replace(/\s/g,'');
    const password = req.body.password.replace(/\s/g,''); // avoiding spaces in login form 
    const user = await User.findOne({where: {email: email}});//find user 
    if (user)// if user is not null
    {
        if (user.login===login)// if our login is correct 
        {
            const agree = await bcrypt.compare(password,user.password)//comparing password returning bool
            if (agree)// if true
            {
                const token = await jwt.sign({//signing to our token email and userId field
                    email: user.email,
                    userId: user.id
                },process.env.JWT_Secret,{//with our secret
                    expiresIn: '1h'
                });
                return res.status(200).json({token: token,//returning token to store it in our frontend
                    message: "Welcome in bank "+user.name+"!"});
            }
        }
    }
    const error = new Error();//possible error
    error.message = "Wrong email, password or login or everything thief :)";
    error.statusCode= 401;
    next(error);
};