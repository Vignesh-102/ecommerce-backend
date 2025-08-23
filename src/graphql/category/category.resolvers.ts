import { Category } from "../../models/category/category.model";

export const categoryResolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    }
  },
  Category: {
    id: (parent: any) => parent._id.toString(),
  },
};
