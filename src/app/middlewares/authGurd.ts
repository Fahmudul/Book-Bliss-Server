import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import CustomError from '../Errors/CustomError';
import catchAsync from '../Utils/catchAsync';
import Config from '../Config';
import { User } from '../Modules/User/User.model';

const authGurd = (...roles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
      throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
    const decodedData = jwt.verify(
      token,
      Config.jwt_secret_key as string,
    ) as JwtPayload;
    const { email, iat, role } = decodedData;
    console.log(decodedData)
    req.user = decodedData;
    const existUser = await User.findOne({
      email,
    });
    if (!existUser) {
      throw new CustomError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (existUser?.passwordChangeAt && iat) {
      const passwordChangeAt = Math.floor(
        new Date(existUser?.passwordChangeAt).getTime() / 1000,
      );

      const checkJwtIssuedBeforeLastPasswordChange = passwordChangeAt > iat;
      if (checkJwtIssuedBeforeLastPasswordChange) {
        throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorized');
      }
    }
    // console.log('roles', roles, 'role', role);
    if (roles.length && !roles.includes(role)) {
      throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
    next();
  });
};

export default authGurd;
