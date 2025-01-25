import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { UserServices } from './User.services';

const createNewUser = catchAsync(async (req, res) => {
  const { password, email, name } = req.body;
  console.log('hitting');
  const result = await UserServices.RegisterUserIntoDb({
    name,
    email,
    password,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  createNewUser,
};
