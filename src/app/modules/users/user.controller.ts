import { Request, Response } from 'express';
import { UserServices } from './user.services';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body.user;
    const zodParsedData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDb(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: 'Something went wrong!',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users data fetched successfully',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await UserServices.getSingleUserFromDb(id);
    res.status(200).json({
      success: true,
      message: 'User data fetched successfully',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await UserServices.deleteUserFromDb(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const productData = req.body;
    const result = await UserServices.addProduct(id, productData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await UserServices.getProducts(id);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: e.message,
      },
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await UserServices.getTotalPrice(id);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: e.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  addProduct,
  getProducts,
  getTotalPrice,
};
