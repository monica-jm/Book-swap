const { Schema, model } = require("mongoose")

const placeSchema = new Schema(
  {
    name: String,
    description: String,
    // GeoJSON
    location: {
      //Type: location property, which is type string
      type: { type: String },
      coordinates: [Number]
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true
  }
)
// Tell mongo to render a 2D map
placeSchema.index({ location: "2dsphere" })

module.exports = model("Place", placeSchema)