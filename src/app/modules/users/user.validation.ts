import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z.string().max(30),
  lastName: z.string().max(30),
});

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().max(30),
  password: z.string().optional(),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    )
    .optional(),
  isDeleted: z.boolean().optional(),
});

export default UserValidationSchema;
