import mongoose, { model } from "mongoose";
import { IReview } from "./review.types";

const reviewSchema = new mongoose.Schema<IReview>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must not exceed 5"]
  },
  comment: {
    type: String,
    maxLength: [2000, 'character limit exceeded'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = model<IReview>("Review", reviewSchema);
export default Review;