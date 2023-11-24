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
        const modifiedData = Object.assign({}, result);
        console.log(modifiedData.password);
        delete modifiedData._doc['password'];
        // console.log('result2', modifiedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: modifiedData._doc,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message || 'Something went wrong',
            error: e,
        });
    }
});
exports.UserControllers = {
    createUser,
};
