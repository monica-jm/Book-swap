const mongoose = require("mongoose");
const { Schema } = mongoose;

const suscriptionSchema = new Schema(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    score: {
      type: Number,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Suscription", suscriptionSchema);
