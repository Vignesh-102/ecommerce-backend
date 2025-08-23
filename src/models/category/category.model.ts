// models/Category.ts
import { Schema, model } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  }
);

export const Category = model<ICategory>("Category", categorySchema);
