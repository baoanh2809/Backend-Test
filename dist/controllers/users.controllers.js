"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailController = exports.refreshTokenController = exports.changePasswordController = exports.getMeController = exports.resetPasswordController = exports.verifyForgotPasswordController = exports.forgotPasswordController = exports.logoutController = exports.registerController = exports.loginController = void 0;
const database_services_1 = __importDefault(require("@/services/database.services"));
const users_services_1 = __importDefault(require("@/services/users.services"));
const mongodb_1 = require("mongodb");
const messages_1 = require("@/constants/messages");
const httpStatus_1 = __importDefault(require("@/constants/httpStatus"));
const loginController = async (req, res) => {
    const user = req.user;
    const user_id = user._id;
    const result = await users_services_1.default.login({ user_id: user_id.toString(), verify: user.verify });
    res.status(200).json({ message: messages_1.USER_MESSAGES.LOGIN_SUCCESS, result });
};
exports.loginController = loginController;
const registerController = async (req, res, next) => {
    const result = await users_services_1.default.register(req.body);
    res.status(201).json({ message: messages_1.USER_MESSAGES.REGISTER_SUCCESS, result });
};
exports.registerController = registerController;
const logoutController = async (req, res) => {
    const { refreshToken } = req.body;
    const result = await users_services_1.default.logout(refreshToken);
    return res.status(201).json(result);
};
exports.logoutController = logoutController;
const forgotPasswordController = async (req, res, next) => {
    const { _id, verify } = req.user;
    const result = await users_services_1.default.forgotPassword({ user_id: _id.toString(), verify });
    return res.status(201).json({ message: messages_1.USER_MESSAGES.CHECK_EMAIL_FORGOT_PASSWORD, result });
};
exports.forgotPasswordController = forgotPasswordController;
const verifyForgotPasswordController = async (req, res, next) => {
    return res.json({
        message: messages_1.USER_MESSAGES.FORGOT_PASSWORD_VERIFIED_SUCCESS
    });
};
exports.verifyForgotPasswordController = verifyForgotPasswordController;
const resetPasswordController = async (req, res, next) => {
    const { user_id } = req.decoded_forgot_password_token;
    const password = req.body.password;
    const result = await users_services_1.default.resetPassword(user_id, password);
    return res.json(result);
};
exports.resetPasswordController = resetPasswordController;
const getMeController = async (req, res, next) => {
    const { user_id } = req.decoded_authorization;
    const user = await users_services_1.default.getMe(user_id);
    return res.json({
        message: messages_1.USER_MESSAGES.GET_ME_SUCCESS,
        result: user
    });
};
exports.getMeController = getMeController;
const changePasswordController = async (req, res, next) => {
    const { user_id } = req.decoded_authorization;
    const { new_password } = req.body;
    const result = await users_services_1.default.changePassword(user_id, new_password);
    return res.json(result);
};
exports.changePasswordController = changePasswordController;
const refreshTokenController = async (req, res, next) => {
    const { refreshToken } = req.body;
    const { user_id, verify, exp } = req.decoded_refresh_token;
    const result = await users_services_1.default.refreshToken({ user_id, refreshToken, verify, exp });
    return res.json({
        message: messages_1.USER_MESSAGES.REFRESH_TOKEN_SUCCESS,
        result
    });
};
exports.refreshTokenController = refreshTokenController;
const verifyEmailController = async (req, res) => {
    const { user_id } = req.decoded_email_veridy_token;
    const user = await database_services_1.default.users.findOne({
        _id: new mongodb_1.ObjectId(user_id)
    });
    if (!user) {
        return res.status(httpStatus_1.default.NOT_FOUND).json({
            message: messages_1.USER_MESSAGES.USER_NOT_FOUND
        });
    }
    if (user.email_verified_token === '') {
        return res.json({
            message: messages_1.USER_MESSAGES.EMAIL_AlREADY_VERIFIED_BEFORE
        });
    }
    await users_services_1.default.verifyEmail(user_id);
    return res.json({
        message: messages_1.USER_MESSAGES.EMAIL_VERIFIED_SUCCESS
    });
};
exports.verifyEmailController = verifyEmailController;
