const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { fundTransfer, balanceRequest } = require("../controllers/account");
const router = express.Router();

router.get('/balance', authMiddleware, balanceRequest)


router.post('/transfer', fundTransfer )


module.exports = router;