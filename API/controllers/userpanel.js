const User = require('../models/user');
const HistoryTransfers = require('../models/history-of-transfers');
module.exports.make_transfer = async (req,res,next)=>{
    const cash = parseInt(req.body.cash);//parsing to int 
    const bill_to_transfer = req.body.bill;
    const user = await User.findOne({where: {id: req.userId}});//finding user with appropriate id which we authenticate in our is-auth middleware
    if (user.cash<=cash)// if we don't have require money to transfer 
    {
        const error = new Error();
        error.message = "You don't have enough money ;(";
        error.statusCode = 500;
        return next(error);
    }
    const user_to_transfer_money = await User.findOne({where: {bill: bill_to_transfer}});// searching for bill to transfer this money
    if(!user_to_transfer_money)// if we can't find this bill throw error 
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
    const datee = await date.toISOString().slice(0, 19).replace('T', ' '); // formating date to pass it into our database
    await user.createHistorytransfer({// this is auto generate function from our sequelize relations 
        dates: datee,
        cash: '-'+cash.toString()
    });
    await user_to_transfer_money.createHistorytransfer({ // we also need to create this date for a user which we pass the money
        dates: datee,
        cash: '+'+cash.toString() // we adding +
    });
    await user_to_transfer_money.save();//saving all to database
    await user.save();
    res.status(200).json({//returning json with succesfull message
        message: 'Succesfully make a transfer. Have a nice day!'
    });
}

module.exports.get_history = async (req,res,next)=>{
    const user = await User.findOne({where: {id: req.userId}}); // the same like up
    const history = await user.getHistorytransfers({order: [
        ['dates','DESC']
    ]});//this is also auto generate function from our relation sequelize. This getting history of transfers from appropriate user
    const transfers = history.map((historytrans,index)=>{//mapping and giving appropriate data to array
        return {date: historytrans.dataValues.dates, cash: historytrans.dataValues.cash};
    });
    res.status(200).json({//returning this transfers
        transfers: transfers
    });
};

module.exports.get_user = async (req,res,next)=>{//getting user 
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