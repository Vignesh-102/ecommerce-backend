import { model, Schema } from "mongoose";
import { IProduct } from "./product.types";
import { PRODUCT_CATEGORIES } from "./product.constant";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      minLength: [5, 'Name must be at least 5 characters'],
      maxLength: [50, 'Name must be at most 50 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxLength: [2000, 'description must be at most 50 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: PRODUCT_CATEGORIES,
        message: '{VALUE} is not a valid category',
      },
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      default: 0,
      min: [0, 'stock must be positive'],
    },
    images: [
      {
        type: [String],
        deafult: [],
      },
    ],
    ratings: {
      type: Number,
      default: 0,
      min: [0, 'ratings must be positive value'],
      max: 5
    },
  },
  { timestamps: true }
);

const productModel = model<IProduct>('Product', productSchema);
export default productModel;
