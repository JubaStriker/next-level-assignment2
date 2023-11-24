import { User } from '../user.models';
import { TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error(`Student already exists`);
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDb = async (id: string) => {
  const result = await User.findOne({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
};
