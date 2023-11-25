import { User } from '../user.models';
import { TProducts, TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error(`User already exists`);
  }
  const result = await User.create(userData);
  delete result.password;
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await User.find({}, { password: 0 });
  return result;
};
const getSingleUserFromDb = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    throw new Error(`User does not exist`);
  }
  const result = await User.findOne({ userId: id });
  return result;
};

const deleteUserFromDb = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    throw new Error(`User does not exist`);
  }
  const result = await User.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

const addProduct = async (id: number, product: TProducts) => {
  if (!(await User.isUserExists(id))) {
    throw new Error(`User does not exist`);
  }
  const result = await User.updateOne(
    { userId: id },
    { $push: { orders: product } },
  );
  return result;
};

const getProducts = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    throw new Error(`User does not exist`);
  }
  const result = await User.find({ userId: id });
  return result[0].orders;
};

const getTotalPrice = async (id: number): Promise<number> => {
  if (!(await User.isUserExists(id))) {
    throw new Error(`User does not exist`);
  }
  const result = await User.find({ userId: id });
  const orders = result[0].orders;

  // eslint-disable-next-line prefer-const
  let totalPrice: number = 0;

  orders?.map(order => {
    totalPrice = totalPrice + order.price * order.quantity;
  });

  return totalPrice;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
  addProduct,
  getProducts,
  getTotalPrice,
};
