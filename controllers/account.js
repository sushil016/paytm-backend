const user = require("../models/user");
const account = require("../models/balance")

exports.fundTransfer = async (req, res) => {

    try{

        // console.log(req.body);

        let result = await user.findOneAndUpdate({ _id: req.user._id }),
            accountResult = await account.findByIdAndUpdate(result.walletId, { $inc: { balance: -parseInt(req.body.amount) } });

        // console.log("Account Result", accountResult);
    }
    
    catch (err){console.error(err)} 


}


exports.balanceRequest = async (req ,res) =>{

    const Account = await account.findOne({
        userId: req.userId
    })

    res.json({
        balance:Account.balance,
    })
}