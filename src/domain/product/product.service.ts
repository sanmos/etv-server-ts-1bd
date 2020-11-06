import ProductDTO from './product.dto';
import ProductModel from './product.model';

export default class ProductService {

    public createProduct(product: ProductDTO){
        const createdProduct = new ProductModel({product});
        const savedProduct =  createdProduct.save();
        //await savedProduct.populate('author', '-password').execPopulate();
        return savedProduct;
    }
 
}