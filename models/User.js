const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: [true, "Please add a User Name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "Please add a password"],
    },
    googleID: {
      type: String,
    },
    facebookID: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://www.shankarainfra.com/img/avatar.png",
    },
    location: {
      type: String,
      //Add location with mapbox
    },
    role: {
      type: String,
      default: "USER",
      //Switch when suscription is paid
      enum: ["USER", "SUSCRIBER"],
    },
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    bookshelf: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);

