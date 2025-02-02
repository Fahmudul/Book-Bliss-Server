import QueryBuilder from '../../Builder/QueryBuilder';
import { IBook } from './Book.interface';
import BookModel from './Book.model';

const CreateBookInDB = async (payload: IBook) => {
  const result = await BookModel.create(payload);
  return result;
};
const RetriveAllBookFromDB = async (query: Record<string, unknown>) => {
  console.log('from line 10', query);
  const AllBookQuery = new QueryBuilder(BookModel.find(), query)
    .search(['author', 'category', 'title'])
    .filter();

  const documentCount = await AllBookQuery.countTotal();
  const result = await AllBookQuery.modelQuery;
  console.log('from all book', result);
  console.log('documentCount', documentCount);
  return result;
};

const RetriveBookFromDB = async (id: string) => {
  const result = await BookModel.findById(id);
  return result;
};

const NumberOfCategory = async () => {
  const result = await BookModel.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);
  return result;
};

const DeleteBookFromDB = async (_id: string) => {
  const result = await BookModel.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  console.log('book Deleted', result);
  return result;
};
const UpdateBookDataInDB = async (_id: string, payload: Partial<IBook>) => {
  const result = await BookModel.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  console.log('book Deleted', result);
  return result;
};
export const BookServices = {
  CreateBookInDB,
  RetriveAllBookFromDB,
  RetriveBookFromDB,
  NumberOfCategory,
  DeleteBookFromDB,
  UpdateBookDataInDB,
};
