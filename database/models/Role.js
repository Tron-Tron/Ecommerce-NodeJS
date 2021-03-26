const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    role_name: {
      type: String,
      unique: true,
      required: [true, "Name Role is required"],
    },
    role_desc: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Role", RoleSchema);
