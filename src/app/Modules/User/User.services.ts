import { TRegister } from '../../types/global';
import { User } from './User.model';
const RegisterUserIntoDb = async ({ name, email, password }: TRegister) => {
  console.log('coming');
  const result = await User.create({
    email,
    password,
    name,
  });
  return result;
};

export const UserServices = {
  RegisterUserIntoDb,
};
