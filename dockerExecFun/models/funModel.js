const mongoose = require("mongoose");

const FunctionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    args: { type: [String], required: true },
    body: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const FunctionModel = mongoose.model("Function", FunctionSchema);
module.exports = FunctionModel;
