const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/route")
const accountRoute = require("./routes/account")
const dotenv = require("dotenv");
const dbConnect = require("./config/database")
dotenv.config();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

app.use('/api/v1/user' , userRoute )
app.use('/api/v1/account' , accountRoute)

dbConnect();

app.get('/' , (req,res) => {
    res.send("paytm ban raha hai guys")
})

app.listen(PORT , () => {
    console.log(`server is running on  port ${PORT}`)
})