import { model, Schema } from 'mongoose';
import { TProducts, TUser, UserModel } from './users/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const productSchema = new Schema<TProducts>({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware/hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // Hashing password and save into DB
  if (user.password !== undefined) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

userSchema.post('save', function (doc, next) {
  delete doc['password'];
  doc.password = '';
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  next();
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Creating a custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
