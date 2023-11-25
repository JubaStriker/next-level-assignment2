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
exports.UserControllers = void 0;
const user_services_1 = require("./user.services");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body.user;
        const zodParsedData = user_validation_1.default.parse(userData);
        const result = yield user_services_1.UserServices.createUserIntoDb(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: {
                code: 404,
                description: 'Something went wrong!',
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserServices.getAllUsersFromDb();
        res.status(200).json({
            success: true,
            message: 'Users data fetched successfully',
            data: result,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.userId);
        const result = yield user_services_1.UserServices.getSingleUserFromDb(id);
        res.status(200).json({
            success: true,
            message: 'User data fetched successfully',
            data: result,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.userId);
        const result = yield user_services_1.UserServices.deleteUserFromDb(id);
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: null,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.userId);
        const productData = req.body;
        const result = yield user_services_1.UserServices.addProduct(id, productData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.userId);
        const result = yield user_services_1.UserServices.getProducts(id);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: {
                code: 404,
                description: e.message,
            },
        });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.userId);
        const result = yield user_services_1.UserServices.getTotalPrice(id);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: result,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: {
                code: 404,
                description: e.message,
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    addProduct,
    getProducts,
    getTotalPrice,
};
