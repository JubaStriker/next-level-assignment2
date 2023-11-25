"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(30),
    lastName: zod_1.z.string().max(30),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().max(30),
    password: zod_1.z.string().optional(),
    fullName: FullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()).max(2),
    address: AddressValidationSchema,
    orders: zod_1.z
        .array(zod_1.z.object({
        productName: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.default = UserValidationSchema;
