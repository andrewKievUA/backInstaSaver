const { Router } = require("express");
const User = require("../models/User");
const Order = require("../models/Order");

const { Types } = require("mongoose");

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
            instaLinkCustomer: req.body.instaLinkCustomer,
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

router.post("/deleteOrder", async (req, res, next) => {
  console.log(req.body);
  const { id, userId, instaLinkCustomer, instaLinkGoods } = req.body;
  try {
    // User.deleteOne({_id: userId},  function(err, res) {
    //   console.log(err, res);
    // } )

    // arrayFilters?: { [key: string]: any }[];
    // {instaLinkCustomer,instaLinkGoods}
    console.log(instaLinkGoods, userId, id);
    User.updateOne(
      //delete
      { _id: userId },
      {
        $pull: { orders: { _id: Types.ObjectId(id) } },
      },
      { multi: true, strictQuery: true, new: true },

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

router.post("/showOrder", async (req, res, next) => {
  // const { email, password, cartNumber, name } = req.body;
  const orders = await User.findOne({ _id: req.body.userId });
  console.log(orders.orders);
  try {
    res.status(201).json({ message: orders.orders });
  } catch (e) {
    res.status(500).json({ message: "errror happends" });
    console.log(e);
  }
});

router.post("/detailOrder", async (req, res, next) => {
  // const { email, password, cartNumber, name } = req.body;

  console.log("body");
  console.log(req.body, "body");
  const page = await User.findOne(
    { _id: req.body.userId },
    { orders: { $elemMatch: { _id: Types.ObjectId(req.body._id) } } }
  );
  console.log(page);
  try {
    res.status(201).json({ message: page });
  } catch (e) {
    res.status(500).json({ message: "errror happends" });
    console.log(e);
  }
});

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
