const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//===============================================================

// > Default value set by Math.random().toString(16).slice(2,)
// > Will generate an arbitary string of length 10
// > done to ensure uniqueness

const uniqueValue = () => {
  return Math.random().toString(16).slice(2);
};

/*const emailRegEx = (email) => {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
};*/

//=============================================================

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    default: uniqueValue(),
  },
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  profileImage: {
    type: String,
    //required: true,
    //default: "LOCATION_TO_DEFAULT_IMAGE",
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    min: 10,
  },
  location_city: {
    type: String,
    required: true,
  },
  location_state: {
    type: String,
    required: true,
  },
  wishlist_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ITEM",
    },
  ],
  sold_items: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ITEM",
      },
      buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ITEM",
      },
      date: { type: Date, default: Date.now },
    },
  ],
  bought_items: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ITEM",
      },
      seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ITEM",
      },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("USER", userSchema);
