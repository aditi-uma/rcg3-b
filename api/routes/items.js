const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

//const firebase = require("../../firebase");
/*const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});*/

const Item = require("..//models/item");
const User = require("..//models/user");

//=================================================================

// > Main page showing all all the books
// > books ordered randomly and not according to any category
// > Table used : ITEM
router.get("/", (req, res, next) => {
  Item.find({ status: 0 })
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Items: docs.map((doc) => {
          return {
            _id: doc._id,
            book_name: doc.book_name,
            book_author: doc.book_author,
            book_edition: doc.book_edition,
            book_price: doc.book_price,
            book_img: doc.book_img,
            request: [
              {
                type: "GET",
                url:
                  req.protocol + "://" + req.get("host") + "/Items/" + doc._id,
              },
              {
                type: "GET",
                url:
                  req.protocol +
                  "://" +
                  req.get("host") +
                  "/User/" +
                  doc.seller,
              },
            ],
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

//==================================================================
// > when user clicks on any particular book put up for sale
// > returns all information regarding that book
// > Table used : ITEMS

router.get("/:ItemId", (req, res, next) => {
  const id = req.params.ItemId;
  Item.findById(id)
    .select({ __v: 0 })
    .exec()
    .then((result) => {
      console.log("From database");
      if (result) {
        const item = {
          _id: result._id,
          book_name: result.book_name,
          book_price: result.book_price,
          //book_img: result.book_img,
          book_author: result.book_author,
          book_edition: result.book_edition,
          seller: result.seller,
          request: [
            {
              type: "GET",
              url:
                req.protocol + "://" + req.get("host") + "/Items/" + result._id,
            },
            {
              type: "GET",
              url:
                req.protocol +
                "://" +
                req.get("host") +
                "/User/" +
                result.seller,
            },
          ],
        };
        res.status(201).json({
          message: "Book retrieved successfully",
          Item: item,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided item ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//==================================================================
// > when user uses the option of getting a book category using filters
// > Filters : [year, branch, refBook]
// > Table used : CATEGORY
//router.get("/cat", (req, res, next) => {});
//==================================================================

//====================================================================

// POST | UPDATE | DELETE

// > operations done only by the active user
// > will work if seller.id of the item on which the opertion to be performed matches that of the current active user
// > Table used : ITEMS

// adding a book to the marketplace
router.post("/:userId", (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        book_name: req.body.book_name,
        book_price: req.body.book_price,
        //book_img: img,
        book_author: req.body.book_author,
        book_edition: req.body.book_edition,
        status: req.body.status,
        seller: userId,
      });
      return item.save();
    })
    .then((result) => {
      const createdItem = {
        _id: result._id,
        book_name: result.book_name,
        book_price: result.book_price,
        //book_img: result.book_img,
        book_author: result.book_author,
        book_edition: result.book_edition,
        seller: result.seller,
        request: [
          {
            type: "GET",
            url:
              req.protocol + "://" + req.get("host") + "/Items/" + result._id,
          },
          {
            type: "GET",
            url:
              req.protocol + "://" + req.get("host") + "/User/" + result.seller,
          },
        ],
      };
      res.status(201).json({
        message: "Book uploaded successfully",
        createdItem: createdItem,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// updating details of a book to the marketplace
router.patch("/:ItemId", (req, res, next) => {
  const id = req.params.ItemId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Item.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Details updated successfully",
        request: {
          type: "GET",
          url: req.protocol + "://" + req.get("host") + "/Items/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
// deleting book from the marketplace
router.delete("/:ItemId", (req, res, next) => {
  const id = req.params.ItemId;
  Item.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
// adding book to wishlist
router.patch("/:itemId/addToWishlist/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const id = req.params.itemId;
  User.findById(userId)
    .then((user) => {
      user.wishlist_items.push(id);
      return user.save();
    })

    .then((result) => {
      res.status(200).json({
        message: "Item added to wishlist successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
// removing book from wishlist
router.patch("/:itemId/delFromWishlist/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const id = req.params.itemId;
  User.findById(userId)
    .then((user) => {
      user.wishlist_items.pull(id);
      return user.save();
    })

    .then((result) => {
      res.status(200).json({
        message: "Item removed from wishlist successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
// adding book to cart
router.patch("/:itemId/buy/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const id = req.params.itemId;
  User.findById(userId)
    .then((user) => {
      user.bought_items.push(id);
      Item.findById(id)
        .update({ status: 1 })
        .then((item) => {
          User.findById(item.seller).then((seller) => {
            seller.sold_items.push(id);
            return seller.save();
          });
          return item.save();
        });
      return user.save();
    })

    .then((result) => {
      res.status(200).json({
        message: "Item added to cart successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
