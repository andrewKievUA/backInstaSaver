const { Router } = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const router = Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");

const config = require("config");
const sendEmail = require("../sendEmail");



// api / auth/register
//andrew1990mk@gmail.com
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, cartNumber, name } = req.body;   
    console.log(req.body);
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такой пользователь уже существует" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      confirmed: false,
      cartNumber,
      name,
    });
    await user.save();
    res.status(201).json({ message: "пользователь создан" });
    //sendEmail(email||`andrew1990mk@gmail.com`,"Приветствуем на Insta saver",`пользователь создан ${email} вам необходимо подтвердить ваш емейл http://localhost:3000/Register/Confirm:44`)
  } catch (e) {
    res.status(500).json({ message: "errror happends" });
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте снова" });
    }

    const {  cartNumber, confirmed, name } = user;
    console.log(user.id);

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });


    res.status(200).json({
      message: {
        token,
        userId: user.id,
        user: email,
        name,
        cartNumber,
        confirmed,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "errror happends" });
  }
});

module.exports = router;
