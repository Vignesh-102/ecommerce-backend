import { model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: 'Electronics' | 'Books' | 'Clothing';
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minLength: [5, 'Name must be at least 5 characters'],
    maxLength: [50, 'Name must be at most 50 characters'],
    trim: true,
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
      values: ['Electronics', 'Books', 'Clothing'],
      message: '{VALUE} is not a valid category',
    },
  },
});

export default model<IProduct>('Product', productSchema);
