const user = require("../models/user");
const jwt = require("jsonwebtoken")
const { JWT_SECRET} = require("../config")
require("dotenv").config();

exports.signup = async (req,res) => {
    try {
        const {username , firstName , lastName , password} = req.body;

        if (!username || !firstName || !lastName || !password) {
            return res.json({
                msg:"all fields required"
            })
        }

        const excitingUser = await user.findOne({username});
        if (excitingUser) {
            return res.status(500).json({
                success:false,
                msg:"user already exists"
            })
        }

        const newUser = await user.create({
            username:username,
            firstName:firstName,
            lastName:lastName,
            password:password
        })

        const userId = newUser._id 

        const token = jwt.sign({userId}, JWT_SECRET);
        console.log(token)

        res.json({
            msg:"user created successfuly",
            token:token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            msg:"error aya"
        })
    }
}