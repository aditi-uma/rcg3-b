const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ITEM_pointer = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "ITEM",
};

const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  FIRST: [{ ITEM_pointer }],
  HUM: [{ ITEM_pointer }],
  EE: {
    EEE: {
      year_3: [{ ITEM_pointer }],
      year_4: [{ ITEM_pointer }],
    },
    ECE: {
      year_3: [{ ITEM_pointer }],
      year_4: [{ ITEM_pointer }],
    },
    ENI: {
      year_3: [{ ITEM_pointer }],
      year_4: [{ ITEM_pointer }],
    },
    YEAR_2: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  CS: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  MECH: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  CHEM: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  MATH: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  ECO: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  PHY: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
  BIO: {
    year_2: [{ ITEM_pointer }],
    year_3: [{ ITEM_pointer }],
    year_4: [{ ITEM_pointer }],
    OTHERS: [{ ITEM_pointer }],
  },
});

module.exports = mongoose.model("CATEGORY", categorySchema);
