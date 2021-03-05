const { Schema, model } = require("mongoose")
//Schema = Schema

const BookSchema = new Schema(
  {
    owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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
      required: [true, "Please add a Book cover"],
    },
    review: {
      type: String,
      //Add location with mapbox
    },
    bookmarks: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Book", BookSchema)
