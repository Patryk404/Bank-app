const Admin = require('../models/admin');
const User = require('../models/user');
const historyTransfers = require('../models/history-of-transfers');
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

module.exports.delete_user = async(req,res,next)=>{
    const id = req.params.id;
    await User.destroy({where: {id: id}});
    res.status(201).json({
        message: 'Succesfully deleted user'
    });
}

module.exports.get_user = async(req,res,next)=>{
    const id = req.params.id;
    const user = await User.findOne({where: {id: id},attributes: ['bill','cash','id','name','surname','login','email']});
    if(!user){
        const error = new Error();
        error.message = "We can't find this user, sorry";
        error.statusCode = 500;
        return next(error);
    }
    res.status(200).json({
        user: user 
    });
};

module.exports.edit_user = async(req,res,next)=>{
    const id = req.params.id;
    await User.update({...req.body},{where: {id:id}});
    res.status(201).json({
        message: 'Succesfully edited user'
    });
};  