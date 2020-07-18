const Admin = require('../models/admin');
const User = require('../models/user');

module.exports.create_admin = async (req,res,next) =>{

    const admin = await Admin.create({
        ...req.body
    });
    await admin.save();
    res.status(201).json({
        message: "Succesfully created new_admin!"
    });
};

module.exports.get_users = async(req,res,next)=>{
    const users = await User.findAll({
        attributes: ['bill','cash','id','name','surname','login']
    });
    res.status(200).json({
        users: users
    });
}