const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    categorie: { type: String, enum: ["function", "answer", "presentations"], required: true },
    withFunction: { type: mongoose.Schema.Types.ObjectId, ref: "Function" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
