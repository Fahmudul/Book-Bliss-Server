import { IBook } from './Book.interface';
import BookModel from './Book.model';

const CreateBookInDB = async (payload: IBook) => {
  const result = await BookModel.create(payload);
  return result;
};
const RetriveAllBookFromDB = async () => {
  const result = await BookModel.find({});
  return result;
};
export const BookServices = {
  CreateBookInDB,
  RetriveAllBookFromDB,
};
