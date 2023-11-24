import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './users/user.interface';

const productSchema = new Schema({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: String, required: [true, 'Price is required'] },
  quantity: { type: String, required: [true, 'Quantity is required'] },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username Id is required'],
    unique: true,
    maxlength: [30, 'Username cannot be at more than 30 characters'],
  },
  password: {
    type: String,
    required: [true, 'Username Id is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      maxlength: [30, 'First Name cannot be at more than 30 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      maxlength: [30, 'Last Name cannot be at more than 30 characters'],
    },
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    validate: {
      validator: function (value: string[]) {
        return value.length <= 2;
      },
      message: 'Hobbies cannot be more than 2',
    },
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  orders: {
    type: [productSchema],
  },
});

// Creating a custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
