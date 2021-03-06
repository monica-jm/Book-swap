const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['Pending Confirmation', 'Active'],
      default: 'Pending Confirmation'
    },
    confirmationCode: {
      type: String,
      required: [true, "Please confirm your email"],
    },
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
    role: {
      type: String,
      default: "USER",
      //Switch when suscription is paid
      enum: ["USER", "SUSCRIBER"],
    },
    bookmarks: [
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
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserReview"
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

