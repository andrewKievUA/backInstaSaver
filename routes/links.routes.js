const { Router } = require("express");
const router = Router();
const config = require("config");

const Link = require("../models/Link");

router.post("/CreateLink", async (req, res, next) => {
  console.log("CreateLink",req.body);
  const r = req.body;




  let checkParams = () => {
    if (r.instaLink && r.instaSupplier && r.owner) {
      if (r.owner.length === 24) {
        console.log("permited CreateLink");
        return true;
      }else{console.log("permited Blocked by owner lenght missed")}
    }else{console.log("permited Blocked by basic aspects missed")}
  };

  let t = new Date();
  if (checkParams()) {
    try {
      console.log(req.body);

      let generateId = Math.random().toString().slice(2, 7);

      const generateUniqId = () => {
        let checkId = Link.findOne({ numberId: generateId });
        checkId;

        generateId = Math.random().toString().slice(2, 7);
      };
      generateUniqId();

      Link.findById;
      const order = new Link({
        instaLink: r.instaLink,
        instaSupplier: r.instaSupplier,
        priceBuy: r.priceBuy,
        priceSell: r.priceSell,
        courier: r.courier,
        numberId: generateId,
        owner: r.owner,
        time:
          t.toLocaleString("ru", { month: "long" }) +
          "(" +
          t.getDate() +
          ")  " +
          t.getHours() +
          ":" +
          t.getMinutes(),
      });
      order.save();
      res.status(201).json({ message: "Заказ создан" });
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});

router.post("/showMaxId", async (req, res, next) => {
  console.log("CreateLink", req.body);
  const r = req.body;

  let checkParams = () => {
    if (r.userId) {
      console.log("permited CreateLink first", r.userId.lenght);
      if (r.userId.length === 24) {
        console.log("permited CreateLink");
        return true;
      }
    }
  };

  if (checkParams()) {
    try {
      let checkId = await Link.findOne({ numberId: r.userId }).sort(
        "-numberId"
      );

      if (checkId === true) {
        res.status(201).json({ message: checkId });
        //  console.log(1);
      } else {
        res.status(201).json({ message: 0 });
        //   console.log(0);
      }
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});



router.post("/getDrop", async (req, res, next) => {
  console.log("getDrop", req.body);
  const r = req.body;

  let checkParams = () => {
    if (r.userId) {
      console.log("permited getDrop first", r.userId.lenght);
      if (r.userId.length === 24) {
        console.log("permited getDrop");
        return true;
      }
    }
  };

  if (checkParams()) {
    try {
      let checkId = await Link.find({ owner: r.userId }).sort(
        "-time"
      );

      if (checkId) {
        res.status(201).json({ message: checkId });
          // console.log(checkId);
      } else {
        res.status(404).json({ message: [] });
        //   console.log(0);
      }
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});


router.post("/deleteLink", async (req, res, next) => {
  console.log(req.body);

  let checkParams = () => {
    if (req.body.id && req.body.userId && req.body.instaLink ) {
      if (req.body.userId.length == 24) {
        return true;
      }else{console.log("blocked by 2")}
    }else{console.log("blocked by 1")}
  };
  if (checkParams()) {
    const { id, userId, instaLink } = req.body;
    try {
      console.log( userId, id);
      Link.deleteOne(
        { owner: userId, id, instaLink }, function (err) {
          if (err) return handleError(err);
          // deleted at most one tank document
        });
      res.status(201).json({ message: "Заказ создан" });
    } catch (e) {
      res.status(500).json({ message: "errror happends" });
      console.log(e);
    }
  }
});


















module.exports = router;
