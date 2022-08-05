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
  let checkParams = () => {
    if (
      req.body.userId &&
      req.body.firstName &&
      req.body.instaLinkGoods &&
      req.body.lastName
    ) {
      if (req.body.userId.length == 24) {
        console.log("permited");
        return true;
      }
    }
  };

  if (checkParams()) {
    try {
      console.log(req.body);
      const order = new Order({
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
      }
      )
      order.save()

      res.status(201).json({ message: "Заказ создан" });
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});

router.post("/deleteOrder", async (req, res, next) => {
  console.log(req.body);

  let checkParams = () => {
    if (req.body._id && req.body.id && req.body.instaLinkGoods) {
      if (req.body._id.length == 24) {
        return true;
      }
    }
  };

  if (checkParams()) {
    const { id, userId, instaLinkCustomer, instaLinkGoods } = req.body;
    try {
      console.log(instaLinkGoods, userId, id);
      User.updateOne(
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
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});





router.post("/updateOrder", async (req, res, next) => {
  console.log("aaa")
  let checkParams = () => {
    if (req.body.userId && req.body.instaLinkGoods) {
      if (req.body.userId.length == 24) {
        return true;
      }
    }
  };

  if (checkParams()) {
    const { id, userId, instaLinkCustomer, instaLinkGoods } = req.body;
    try {
      ///console.log(instaLinkGoods, userId, id);
      console.log(userId, ' ', req.body._id)
      let _id = req.body._id

      let z = req.body
      console.log(z)
      

     let user = await Order.updateOne({userId,_id},{
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

  }
     ) 

      console.log(user)
      res.status(201).json({ message: "Заказ создан" });
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});



router.post("/showOrder", async (req, res, next) => {
  let checkParams = () => {
    if (req.body.userId) {
      if (req.body.userId.length == 24) {
        return true;
      }
    }else{console.log("blocked",req.body);}
  };

  if (checkParams()) {
    const orders = await Order.find({ userId: req.body.userId });
    console.log(orders,"show order");
    try {
      res.status(201).json({ message: orders });
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});

router.post("/detailOrder", async (req, res, next) => {
  // const { email, password, cartNumber, name } = req.body;
  let checkParams = () => {
    if (req.body._id && req.body.userId) {
      if (req.body._id.length == 24 && req.body.userId.length == 24) {
        return true;
      }
    }
  };
  if (checkParams()) {
    console.log(req.body, "body");
    const page = await Order.findById(req.body._id)
    console.log(page,"detailOrder");
    try {
      res.status(201).json({ message: page });
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  } else {
    console.log("asdfasdf");
    res.status(200).json({ message: "validation failed" });
  }
});

module.exports = router;
