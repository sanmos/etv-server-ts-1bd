import { Request, Response, NextFunction, Router } from 'express';
import ProductNotFoundException from './../../exceptions/ProductNotFoundException';
import Controller from './../../interfaces/controller.interface';
import RequestWithUser from './../../interfaces/requestWithUser.interface';
import authMiddleware from './../../middleware/auth.middleware';
import validationMiddleware from './../../middleware/validation.middleware';
import ProductDTO from './product.dto';
import Product from './product.interface';
import productModel from './product.model';
import ProductService from './product.service';

class ProductController implements Controller {
  public path = '/products';
  public router = Router();
  private product = productModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router
      ////.all(`${this.path}/*`, authMiddleware)
      ////.patch(`${this.path}/:id`, validationMiddleware(ProductDTO, true), this.modifyProduct)
      .patch(`${this.path}/:id`, this.modifyProduct)
      .delete(`${this.path}/:id`, this.deleteProduct)
      .post(this.path, this.createProduct);
      ////.product(this.path, validationMiddleware(ProductDTO), this.createProduct);
      //.product(this.path, authMiddleware, validationMiddleware(ProductDTO), this.createProduct);

  }

  private getAllProducts = async (request: Request, response: Response) => {
    const products = await this.product.find()
      .populate('author', '-password');
    response.send(products);
  }

  private getProductById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const product = await this.product.findById(id);
    if (product) {
      response.send(product);
    } else {
      next(new ProductNotFoundException(id));
    }
  }

  private modifyProduct = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const productData: Product = request.body;
    const product = await this.product.findByIdAndUpdate(id, productData, { new: true });
    if (product) {
      response.send(product);
    } else {
      next(new ProductNotFoundException(id));
    }
  }

  /*
  route.post('/', 
  validators.userSignup, // this middleware take care of validation
  async (req, res, next) => {
    // The actual responsability of the route layer.
    const userDTO = req.body;

    // Call to service layer.
    // Abstraction on how to access the data layer and the business logic.
    const { user, company } = await UserService.Signup(userDTO);

    // Return a response to client.
    return res.json({ user, company });
  });
  */

  private createProduct = async (request: Request, response: Response) => {
    const productDTO: ProductDTO = request.body;
    const { product } = await ProductService.createProduct(productDTO);
    response.send(savedProduct);
  }

  //  private createProduct = async (request: RequestWithUser, response: Response) => {
  /*private createProduct = async (request: Request, response: Response) => {
    const productData: ProductDTO = request.body;
    const createdProduct = new this.product({
      ...productData//,
      //author: request.user._id,
    });
    const savedProduct = await createdProduct.save();
    await savedProduct.populate('author', '-password').execPopulate();
    response.send(savedProduct);
  }*/

  private deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const successResponse = await this.product.findByIdAndDelete(id);
    if (successResponse) {
      response.send(200);
    } else {
      next(new ProductNotFoundException(id));
    }
  }
}

export default ProductController;
