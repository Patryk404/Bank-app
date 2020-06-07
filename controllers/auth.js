const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatebill} = require('../utils/complicated-bill-generator');
require('dotenv').config();
const {validationResult} = require('express-validator');
module.exports.signup= async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error = new Error();
        error.message = "Validation failed";
        return next(error);
    }
    const existing_user = await User.findOne({where: {email: req.body.email}});
    if(existing_user)
    {
        const error = new Error();
        error.message = "Email is already taken!";
        error.statusCode = 409;
        return next(error);
    } 
    const hashed_password = await bcrypt.hash(req.body.password,12);
    req.body.password = hashed_password;
    const user = await User.create({
        ...req.body,
        bill: generatebill()
    });
    res.status(201).json({
        message: "Succesfully created a user in our bank! Welcome "+user.dataValues.name.toString()+"!",
    });
}
module.exports.login = async (req,res,next)=>{
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password; 
    const user = await User.findOne({where: {email: email}});
    if (user)
    {
        if (user.login===login)
        {
            const agree = await bcrypt.compare(password,user.password)
            if (agree)
            {
                const token = await jwt.sign({
                    email: user.email,
                    userId: user.id
                },process.env.JWT_Secret,{
                    expiresIn: '1h'
                });
                return res.status(200).json({token: token,
                    message: "Welcome in bank "+user.name+"!"});
            }
        }
    }
    const error = new Error();
    error.message = "Wrong email, password or login or everything thief :)";
    error.statusCode= 401;
    next(error);
};