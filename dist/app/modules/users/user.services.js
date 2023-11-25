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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_models_1 = require("../user.models");
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_models_1.User.isUserExists(userData.userId)) {
        throw new Error(`User already exists`);
    }
    const result = yield user_models_1.User.create(userData);
    delete result.password;
    return result;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.User.find({}, { password: 0, isDeleted: 0 });
    return result;
});
const getSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_models_1.User.isUserExists(id))) {
        throw new Error(`User does not exist`);
    }
    const result = yield user_models_1.User.findOne({ userId: id }, { password: 0, isDeleted: 0 });
    return result;
});
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_models_1.User.isUserExists(id))) {
        throw new Error(`User does not exist`);
    }
    const result = yield user_models_1.User.updateOne({ userId: id }, { isDeleted: true });
    return result;
});
const addProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_models_1.User.isUserExists(id))) {
        throw new Error(`User does not exist`);
    }
    const result = yield user_models_1.User.updateOne({ userId: id }, { $push: { orders: product } });
    return result;
});
const getProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_models_1.User.isUserExists(id))) {
        throw new Error(`User does not exist`);
    }
    const result = yield user_models_1.User.find({ userId: id });
    return result[0].orders;
});
const getTotalPrice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_models_1.User.isUserExists(id))) {
        throw new Error(`User does not exist`);
    }
    const result = yield user_models_1.User.find({ userId: id });
    const orders = result[0].orders;
    // eslint-disable-next-line prefer-const
    let totalPrice = 0;
    orders === null || orders === void 0 ? void 0 : orders.map(order => {
        totalPrice = totalPrice + order.price * order.quantity;
    });
    return totalPrice;
});
exports.UserServices = {
    createUserIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    deleteUserFromDb,
    addProduct,
    getProducts,
    getTotalPrice,
};
