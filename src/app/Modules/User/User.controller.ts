import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { UserServices } from './User.services';
import bcrypt from 'bcryptjs';
import Config from '../../Config';
const createNewUser = catchAsync(async (req, res) => {
  // console.log(bcrypt);
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    Number(Config.bcrypt_salt_rounds),
  );
  const userDataWithCncryptedPassword = {
    ...req.body,
    password: hashedPassword,
  };
  const result = await UserServices.RegisterUserIntoDb(
    userDataWithCncryptedPassword,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const RetriveUsers = catchAsync(async (req, res) => {
  const result = await UserServices.RetriveAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
export const UserControllers = {
  createNewUser,
  RetriveUsers,
};
