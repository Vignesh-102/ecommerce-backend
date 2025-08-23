import { categoryResolvers } from "./category/category.resolvers";
import { categoryTypeDefs } from "./category/category.typeDeps";
import { productResolvers } from "./product/product.resolvers";
import { ProductTypeDefs } from "./product/product.typeDefs";


export const typeDefs = [ProductTypeDefs, categoryTypeDefs];
export const resolvers = [productResolvers, categoryResolvers];