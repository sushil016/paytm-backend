const user = require("../models/user")


exports.bulk = async (req , res ) =>{

    const filter = req.query.filter || "";

    const users = await user.find({
         $or:[{
            firstName : {
                "$regex": filter
            },
         },{
            lastName : {
                "$regex":filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username : user.username,
            firstName: user.firstName,
            lastName:user.lastName,
            _id : user._id

        }))
    })
}