const express = require("express")
const router = express.Router();
const {signup, login} = require("../controllers/auth");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { bulk } = require("../controllers/filter");



router.post('/signup', signup)
router.post('/login',login , authMiddleware)
router.get('/bulk' , bulk);


module.exports = router