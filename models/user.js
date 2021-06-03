const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true /*,match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/*/ },
    // confirmPw:{ type: String, required: true/*,match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/*/}
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    functions: [{ type: mongoose.Schema.Types.ObjectId, ref: "function" }],
    descriptions: { type: String, default: "Aucune" },
    avatar: { type: String, default: "/images/basicAvatar.png" },
    status: { type: String, enum: ["user", "admin"], default: "user" },
    publicContact: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
const usersModel = mongoose.model("User", UsersSchema);
module.exports = usersModel;
