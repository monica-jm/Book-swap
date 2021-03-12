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
    },
    review: {
      type: String,
    },
    location: {
      //Type: location property, which is type string
      type: { type: String },
      coordinates: [Number]
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

// Tell mongo to render a 2D map
BookSchema.index({ location: "2dsphere" })

module.exports = model("Book", BookSchema)
