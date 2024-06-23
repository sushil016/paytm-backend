const user = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const account = require("../models/balance");
require("dotenv").config();
const bcrypt = require("bcrypt");
const zod = require("zod");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
exports.signup = async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.json({
        msg: "all fields required",
      });
    }

    const excitingUser = await user.findOne({
      username: req.body.username,
    });
    if (excitingUser) {
      return res.status(500).json({
        success: false,
        msg: "user already exists",
      });
    }

    const newUser = await user.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    const userId = newUser._id;

    await account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({ userId }, JWT_SECRET);
    console.log(token);

    res.json({
      msg: "user created successfuly",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error aya",
    });
  }
};


const loginBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });

exports.login = async (req, res) => {
  
    
    const { success } = loginBody.safeParse(req.body);

    if (!success) {
      return res.status(404).json({
        message: "fill all details",
      });
    }

    let newUser = await user.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    
    if (!newUser) {
      return res.status(404).json({
        success: false,
        message: "please signup firstly",
      });
    }

    let payload = {
      username: newUser.username,
      id: newUser._id,
    };

    if (newUser) {
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
      res.json({
        token: token,
      });
      return;
    }

    res.status(411).json({
      message: "error while logging in",
    });
  
};
