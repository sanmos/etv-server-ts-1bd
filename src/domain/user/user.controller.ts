import { Router, Request, Response, NextFunction } from 'express';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import Controller from '../../interfaces/controller.interface';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import authMiddleware from './../../middleware/auth.middleware';
import productModel from './../product/product.model';
import userModel from './user.model';
import UserNotFoundException from '../../exceptions/UserNotFoundException';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private product = productModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    ////this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
    ////this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllProductsOfUser);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.get(`${this.path}/:id/products`, this.getUserById);
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const userQuery = this.user.findById(id);
    if (request.query.withPosts === 'true') {
      userQuery.populate('products').exec();
    }
    const user = await userQuery;
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  }

  private getAllProductsOfUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    if (userId === request.user._id.toString()) {
      const products = await this.product.find({ author: userId });
      response.send(products);
    }
    next(new NotAuthorizedException());
  }
}

export default UserController;
