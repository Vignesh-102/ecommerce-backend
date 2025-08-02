import { Router, Request, Response} from "express";
import Product from "../models/product/product.model.";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try{
        const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error })
    } 
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct){
            res.status(404).json({ message: 'Product not found' });
            return;
        }  
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct){
            res.status(404).json({ message: 'Product not found' });
            return;
        }  
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

export default router;