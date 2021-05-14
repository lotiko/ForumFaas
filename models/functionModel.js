const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    args: [String],
    body: String,
    authorId: String,
  },
  { timestamps: true }
);

const funModel = mongoose.model("Fun", schema);
module.exports = funModel;
