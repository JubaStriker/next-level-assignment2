import { User } from '../user.models';
import { TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error(`User already exists`);
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

const deleteUserFromDb = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    throw new Error(`User does not exist`);
  }

  const data = await User.isUserExists(id);
  console.log(data);
  const result = await User.deleteOne({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
};
