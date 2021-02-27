const mongoose = require("mongoose");
//Schema = Schema
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a Book title"],
    },
    author: {
      type: String,
      required: [true, "Please add an Author"],
    },
    isbn: {
      type: String,
    },
    category: {
      type: String,
    },
    bookCover: {
      type: String,
      default: "https://www.shankarainfra.com/img/avatar.png",
    },
    review: {
      type: String,
      //Add location with mapbox
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Book", bookSchema);
