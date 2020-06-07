const User = require('../models/user');

module.exports.make_transfer = async (req,res,next)=>{
    const cash = req.body.cash;
    const bill_to_transfer = req.body.bill;
    const user = await User.findOne({where: {id: req.userId}});
    if (user.cash<=cash)
    {
        const error = new Error();
        error.message = "You don't have enough money ;(";
        error.statusCode = 500;
        return next(error);
    }
    const user_to_transfer_money = await User.findOne({where: {bill: bill_to_transfer}});
    if(!user_to_transfer_money)
    {
        const error = new Error();
        error.message = "Sorry but this bill not exist";
        error.statusCode = 500;
        return next(error);
    }
    if(user.bill === bill_to_transfer)//avoiding transfer to yourself
    {
        const error = new Error();
        error.message = "Really you want to transfer your cash to yourself? Are you thinking this is funny?";
        error.statusCode = 500;
        return next(error);
    }
    user_to_transfer_money.cash += cash;
    user.cash -=cash;
    await user_to_transfer_money.save();
    await user.save();
    res.status(200).json({
        message: 'Succesfully make a transfer. Have a nice day!'
    });
}