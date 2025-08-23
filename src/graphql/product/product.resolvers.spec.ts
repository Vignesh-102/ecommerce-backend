import { productResolvers } from './product.resolvers';
import Product from '../../models/product/product.model.';

jest.mock('../../src/models/product');

const mockedProduct = Product as jest.Mocked<typeof Product>;

describe('Product Resolvers', () => {
  const sampleProduct = {
    _id: '1',
    name: 'Test Product',
    price: 100,
    category: 'Books',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.products', () => {
    it('should return all products', async () => {
      mockedProduct.find.mockResolvedValue([sampleProduct]);

      const result = await productResolvers.Query.products();
      expect(result).toEqual([sampleProduct]);
      expect(mockedProduct.find).toHaveBeenCalled();
    });
  });

  describe('Query.product', () => {
    it('should return a single product by id', async () => {
      mockedProduct.findById.mockResolvedValue(sampleProduct as any);

      const result = await productResolvers.Query.product({}, { id: '1' });
      expect(result).toEqual(sampleProduct);
      expect(mockedProduct.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('Mutation.addProduct', () => {
      it('should create and return the new product', async () => {
          const saveMock = jest.fn().mockResolvedValue(sampleProduct);
          (jest.mocked(Product as unknown as jest.Mock)).mockImplementation(() => ({
              save: saveMock,
          }));

      const result = await productResolvers.Mutation.addProduct({}, {
        name: 'Test Product',
        price: 100,
        category: 'Books',
      });

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(sampleProduct);
    });
  });

  describe('Mutation.updateProduct', () => {
    it('should update and return the updated product', async () => {
      mockedProduct.findByIdAndUpdate.mockResolvedValue(sampleProduct as any);

      const result = await productResolvers.Mutation.updateProduct({}, {
        input: { id: '1', price: 150 },
      });

      expect(mockedProduct.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { price: 150 },
        { new: true, runValidators: true }
      );
      expect(result).toEqual(sampleProduct);
    });

    it('should throw error if product not found', async () => {
      mockedProduct.findByIdAndUpdate.mockResolvedValue(null);

      await expect(productResolvers.Mutation.updateProduct({}, {
        input: { id: '1', price: 150 },
      })).rejects.toThrow('Product update failed');
    });
  });

  describe('Mutation.deleteProduct', () => {
    it('should return true when product is deleted', async () => {
      mockedProduct.findByIdAndDelete.mockResolvedValue(sampleProduct as any);

      const result = await productResolvers.Mutation.deleteProduct({}, { id: '1' });
      expect(result).toBe(true);
    });

    it('should return false when product is not found', async () => {
      mockedProduct.findByIdAndDelete.mockResolvedValue(null);

      const result = await productResolvers.Mutation.deleteProduct({}, { id: '1' });
      expect(result).toBe(false);
    });
  });
});
