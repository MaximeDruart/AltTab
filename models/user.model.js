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
      default: 15000,
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

userSchema.methods.getPublicFields = function () {
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    money: this.money,
    acquiredItems: this.acquiredItems,
  }
}

const User = mongoose.model("User", userSchema)

module.exports = User
