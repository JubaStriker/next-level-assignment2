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
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message || 'Something went wrong',
      error: e,
    });
  }
};

export const UserControllers = {
  createUser,
};
