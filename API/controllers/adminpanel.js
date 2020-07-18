const Admin = require('../models/admin');
const User = require('../models/user');

module.exports.create_admin = async (req,res,next) =>{
    
    const user = await Admin.create({
        ...req.body
    });
    await user.save();
    res.status(201).json({
        message: "Succesfully created new_admin!"
    });
}