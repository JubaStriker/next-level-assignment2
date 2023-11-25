"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const productSchema = new mongoose_1.Schema({
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
});
const userSchema = new mongoose_1.Schema({
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
        validate: {
            validator: function (value) {
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
// pre save middleware/hook
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // Hashing password and save into DB
        if (user.password !== undefined) {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
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
userSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
