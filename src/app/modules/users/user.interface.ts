import { Model } from 'mongoose';

export interface TProducts {
  productName: string;
  price: number;
  quantity: number;
}
export interface TUser {
  userId: number;
  username: string;
  password?: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TProducts[];
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}
