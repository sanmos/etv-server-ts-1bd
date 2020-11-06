import * as mongoose from 'mongoose';
import Product from './product.interface';

const productSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: String,
  price: String,
});

const productModel = mongoose.model<Product & mongoose.Document>('Product', productSchema);

export default productModel;
