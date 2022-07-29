const { Router } = require("express");
const User = require("../models/User");
const Order = require("../models/Order");

const router = Router();
const { check, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const config = require("config");

//andrew1990mk@gmail.com
router.post("/AddOrder", async (req, res, next) => {
  const { email, password, cartNumber, name } = req.body;
  try {
    console.log(req.body);

    User.updateOne(
      { _id: req.body.userId },
      {
        $push: {
          orders: new Order({
            instaLinkCustomer: "3df",
            instaLinkGoods: req.body.instaLinkGoods,
            arrived: req.body.arrived,
            payed: req.body.payed,
            comment: req.body.comment,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            telephone: req.body.telephone,
            postNumer: req.body.postNumer,
            userId: req.body.userId,
          }),
        },
      },

      function (err, res) {
        console.log(err, res);
      }
    );



    res.status(201).json({ message: "Заказ создан" });
    //sendEmail(email||`andrew1990mk@gmail.com`,"Приветствуем на Insta saver",`пользователь создан ${email} вам необходимо подтвердить ваш емейл http://localhost:3000/Register/Confirm:44`)
  } catch (e) {
    res.status(500).json({ message: "errror happends" });
    console.log(e);
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Пользователь не найден" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ message: "Неверный пароль, попробуйте снова" });
//     }

//     const {  cartNumber, confirmed, name } = user;
//     console.log(user.id);

//     const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: {
//         token,
//         userId: user.id,
//         user: email,
//         name,
//         cartNumber,
//         confirmed,
//       },
//     });
//   } catch (e) {
//     res.status(500).json({ message: "errror happends" });
//   }
// });

module.exports = router;

// User.updateOne(  //delete
// { _id: `62e3be3549cae9d52f0ff28f` },
// {
//   $pull: { orders: { instaLinkGoods: "ddddddddddddd" } }},
//   { "multi" : true }  ,

//   function(err, res) {
//     console.log(err, res);
//   },

// );
