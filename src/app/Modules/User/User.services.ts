import { TRegister } from '../../types/global';
import { User } from './User.model';
const RegisterUserIntoDb = async ({ name, email, password }: TRegister) => {
  // console.log('coming');
  // console.log('hashed password', password);
  const result = await User.create({
    email,
    password,
    name,
  });
  return result;
};

const RetriveAllUserFromDB = async () => {
  const result = await User.find({});
  return result;
};
export const UserServices = {
  RegisterUserIntoDb,
  RetriveAllUserFromDB,
};
