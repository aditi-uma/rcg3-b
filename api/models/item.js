const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  book_name: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  book_edition: {
    type: Number,
    default: "1",
  },
  book_img: [
    {
      type: String,
    },
  ],
  book_price: {
    type: Number,
    required: true,
    min: 0,
  },
  remarks: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
  status: {
    type: Number,

    default: "0",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ITEM", itemSchema);
