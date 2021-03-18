const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("..//models/user");

//====================================================================

// > Main user page showing all the info
// > common endpoint for active user or any random user
// > All CRUD operations should match the User.id with that of the current active user
// > Table used : USER

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("-__v")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid user found for provided user ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User details updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// > Operations to get particular details about the user

router.get("/:userId/sold", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("sold_items")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid user found for provided user ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:userId/bought", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("bought_items")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid user found for provided user ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:userId/wishlist", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("wishlist_items")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid user found for provided user ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//===================================================================
//For Testing

router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Items: docs.map((doc) => {
          return {
            _id: doc._id,
            user_name: doc.username,
            email: doc.email,
            password: doc.password,
            location_city: doc.location_city,
            location_state: doc.location_state,

            request: {
              type: "GET",
              url: req.protocol + "://" + req.get("host") + "/user/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//===================================================================

router.post("/", (req, res, next) => {
  //console.log(req.file);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    //profileImage: req.body.book_author,
    password: req.body.password,
    location_city: req.body.location_city,
    location_state: req.body.location_state,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//===================================================================

module.exports = router;
