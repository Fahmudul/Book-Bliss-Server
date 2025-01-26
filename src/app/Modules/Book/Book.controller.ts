import sendResponse from '../../Utils/sendResponse';
import catchAsync from '../../Utils/catchAsync';
import httpStatus from 'http-status';
import { BookServices } from './Book.services';

const CreateBook = catchAsync(async (req, res) => {
  const result = await BookServices.CreateBookInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});
const RetriveBooks = catchAsync(async (req, res) => {
  const result = await BookServices.RetriveAllBookFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});
export const BookController = {
  CreateBook,
  RetriveBooks,
};
