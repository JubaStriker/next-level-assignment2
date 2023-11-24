import { model, Schema } from 'mongoose';
import { TUser } from './users/user.interface';

const userSchema = new Schema<TUser>({
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
        return value.length < 2;
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
});

export const User = model<TUser>('User', userSchema);
