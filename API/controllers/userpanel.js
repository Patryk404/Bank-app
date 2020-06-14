const User = require('../models/user');
const HistoryTransfers = require('../models/history-of-transfers');
module.exports.make_transfer = async (req,res,next)=>{
    const cash = parseInt(req.body.cash);
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
    let date = new Date;
    const datee = await date.toISOString().slice(0, 19).replace('T', ' '); 
    await user.createHistorytransfer({
        dates: datee,
        cash: '-'+cash.toString()
    });
    await user_to_transfer_money.createHistorytransfer({
        dates: datee,
        cash: '+'+cash.toString()
    });
    await user_to_transfer_money.save();
    await user.save();
    res.status(200).json({
        message: 'Succesfully make a transfer. Have a nice day!'
    });
}

module.exports.get_history = async (req,res,next)=>{ 
    const user = await User.findOne({where: {id: req.userId}});
    const history = await user.getHistorytransfers();
    const transfers = history.map(historytrans=>{
        return historytrans.dataValues;
    });
    const transfers2 = transfers.map(xd=>{
        return {date: xd.dates};
    });
    const transfers_to_send = transfers2.map((obj,index)=>{
        return {...obj,cash: transfers[index].cash};
    })
    //filtering data 
    res.status(200).json({
        transfers: transfers_to_send
    });
};

module.exports.get_user = async (req,res,next)=>{
    const user = await User.findOne({where: {id: req.userId}});
    if (!user){
        const error = new Error();
        error.message = "We can't find this user, sorry";
        error.statusCode = 500;
        return next(error);
    }
    res.status(200).json({
        name: user.dataValues.name,
        surname: user.dataValues.surname,
        cash: user.dataValues.cash,
        bill: user.dataValues.bill, 
    });
};