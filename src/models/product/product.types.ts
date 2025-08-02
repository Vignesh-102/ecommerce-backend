import { Document } from "mongoose";
import { ProductCategory } from "./product.constant";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  images: string[];
  ratings: number;
}