const express = require("express");
const router = express.Router();

router.get('/balance', async (req,res) => {
    res.send("your balance is very low 0.1Rs")
})

module.exports = router;