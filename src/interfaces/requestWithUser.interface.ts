import { Request } from 'express';
import User from '../domain/user/user.interface';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
