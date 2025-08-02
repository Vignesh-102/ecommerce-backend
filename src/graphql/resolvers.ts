import Product from '../models/product/product.model.';
import { IProduct } from '../models/product/product.types';

interface ProductArgs {
    id: string;
}

interface ProductInput {
    name: string;
    price: number;
    category: string;
}

interface UpdateProductInput {
    id: string;
    name?: string;
    price?: number;
    category?: string;
}

export const resolvers = {
    Query: {
        products: async (): Promise<IProduct[]> => await Product.find(),

        product: async (_: unknown, { id }: ProductArgs): Promise<IProduct | null> =>
            await Product.findById(id),
    },
    Mutation: {
        addProduct: async (_: unknown, args: ProductInput): Promise<IProduct> => {
            const newProduct = new Product(args);
            return await newProduct.save();
        },

        updateProduct: async (_: unknown, args: { input: UpdateProductInput }): Promise<IProduct | null> => {
            const { id, ...fieldsToUpdate } = args.input;

            try {
                const updated = await Product.findByIdAndUpdate(id, fieldsToUpdate, {
                    new: true,
                    runValidators: true,
                });
                console.log("Update input:", args);
                console.log("Update fields:", fieldsToUpdate);
                console.log("Updated product:", updated);

                if (!updated) {
                    throw new Error('Product not found');
                }

                return updated;
            } catch (err) {
                console.error('Update failed:', err);
                throw new Error('Product update failed');
            }
        },

        deleteProduct: async (_: unknown, { id }: ProductArgs): Promise<boolean> => {
            const result = await Product.findByIdAndDelete(id);
            return !!result;
        },
    },
};

