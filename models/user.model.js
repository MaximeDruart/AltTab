const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      required: true,
    },
    money: {
      type: Number,
      default: 0,
    },
    acquiredItems: {
      avatar: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User
