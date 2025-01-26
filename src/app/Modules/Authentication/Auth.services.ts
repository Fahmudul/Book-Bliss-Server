import bcrypt from 'bcryptjs';
import { User } from '../User/User.model';
import httpStatus from 'http-status';
import CustomError from '../../Errors/CustomError';

const Login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      `User not found with email ${email}`,
    );
  }
  // console.log('from line 20', userExist.password);
  const isPasswordMatched = bcrypt.compareSync(password, userExist.password);
  if (!isPasswordMatched) {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }
  return userExist;
};

export const AuthServices = { Login };
