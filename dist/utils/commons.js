"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.numberEnumToArray = void 0;
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const jwt_1 = require("../utils/jwt");
const lodash_1 = require("lodash");
const numberEnumToArray = (numberEnum) => {
    return Object.values(numberEnum).filter((value) => typeof value === 'number');
};
exports.numberEnumToArray = numberEnumToArray;
const verifyAccessToken = async (accessToken, req) => {
    if (!accessToken) {
        throw new Errors_1.ErrorsWithStatus({
            message: messages_1.USER_MESSAGES.AUTHORIZATION_IS_INVALID,
            status: httpStatus_1.default.UNAUTHORIZED
        });
    }
    try {
        const decoded_authorization = await (0, jwt_1.verifyToken)({
            token: accessToken,
            secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN
        });
        if (req) {
            ;
            req.decoded_authorization = decoded_authorization;
            return true;
        }
        return decoded_authorization;
    }
    catch (err) {
        throw new Errors_1.ErrorsWithStatus({
            message: (0, lodash_1.capitalize)(err.message),
            status: httpStatus_1.default.UNAUTHORIZED
        });
    }
};
exports.verifyAccessToken = verifyAccessToken;
