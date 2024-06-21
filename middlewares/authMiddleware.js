const user = require("../models/user")

exports.authMiddleware = async (req , res , next ) =>{
    try {
        const token = req.headers("Authorization").replace("bearer ", "")

        console.log(token);

        if (!token) {
            return res.send("token missing")
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
    
            req.userId = decoded.userId;
    
            
        } catch (err) {
            return res.status(403).json({});
        }

        next();
    } 
    
    catch (error) {
        console.log(error);
    }
}