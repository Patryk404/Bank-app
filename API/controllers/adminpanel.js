const Admin = require('../models/admin');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.create_admin = async (req,res,next) =>{
    const password = await bcrypt.hash(req.body.password,12);
    const admin = await Admin.create({
        ...req.body,
        password: password
    });
    await admin.save();
    res.status(201).json({
        message: "Succesfully created new admin account!"
    });
};

module.exports.get_users = async(req,res,next)=>{
    const users = await User.findAll({
        order: ['id'],
        attributes: ['bill','cash','id','name','surname','login','email']
    });
    res.status(200).json({
        users: users
    });
}