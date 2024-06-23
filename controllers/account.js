
const account = require("../models/balance")
const mongoose = require("mongoose")

exports.fundTransfer = async (req, res) => {

    try{

       const session = mongoose.startSession();
       
        session.startTransaction();

        const {amount , to } = req.body

        const Account = await account.findOne({userId:req.userId}).session(session);

        if (!Account || Account.balance< amount) {
            (await session).abortTransaction()

            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        
        const toAccount = await account.findOne({ userId:to }).session(session)

        if (!toAccount) {
            await session.abortTransaction()

            return res.status(400).json({
                message:"invalid account",
                success:false
            })
        }

        await account.updateOne({ userId:req.userId } , { $inc: {balance : -amount } }).session(session)
        await account.updateOne({ userId:to } ,{$inc : {balance : amount } }).session(session)
        
        (await session).commitTransaction();

        res.json({
            success:true,
            message:"transsction sussessful"
        })

        res.send("hello transfer")
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

    res.send("hello payment")
}