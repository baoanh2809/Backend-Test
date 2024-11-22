"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../constants/enums");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const Errors_1 = require("../models/Errors");
const User_schema_1 = __importDefault(require("../models/schemas/User.schema"));
const refreshToken_schema_1 = __importDefault(require("../models/schemas/refreshToken.schema"));
const database_services_1 = __importDefault(require("../services/database.services"));
const crypto_1 = require("../utils/crypto");
const jwt_1 = require("../utils/jwt");
const crypto_2 = require("crypto");
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
class UserService {
    signAccessToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenTypes.AccessToken,
                verify
            },
            privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
            option: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
            }
        });
    }
    signRefeshToken({ user_id, verify, exp }) {
        if (exp) {
            return (0, jwt_1.signToken)({
                payload: {
                    user_id,
                    token_type: enums_1.TokenTypes.RefreshToken,
                    verify,
                    exp
                },
                privateKey: process.env.JWT_SECRET_REFRESH_TOKEN
            });
        }
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenTypes.RefreshToken,
                verify
            },
            privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
            option: {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
            }
        });
    }
    signEmailVerifyToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenTypes.RefreshToken
            },
            privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN,
            option: {
                expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN
            }
        });
    }
    signForgotPasswordToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenTypes.ForgotPasswordToken
            },
            privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_VERIFY_TOKEN,
            option: {
                expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN
            }
        });
    }
    signAccessAndRefeshToken({ user_id, verify }) {
        return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefeshToken({ user_id, verify })]);
    }
    decodeRefreshToken(refreshToken) {
        return (0, jwt_1.verifyToken)({
            token: refreshToken,
            secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN
        });
    }
    async register(payload) {
        const user_id = new mongodb_1.ObjectId();
        const email_verified_token = await this.signEmailVerifyToken({
            user_id: user_id.toString(),
            verify: enums_1.UserVerifiStatus.Unverified
        });
        await database_services_1.default.users.insertOne(new User_schema_1.default({
            ...payload,
            _id: user_id,
            username: `user_${user_id.toString()}`,
            email_verified_token,
            dateofbirth: new Date(payload.dateofbirth),
            password: (0, crypto_1.hashPassword)(payload.password)
        }));
        const [accessToken, refreshToken] = await this.signAccessAndRefeshToken({
            user_id: user_id.toString(),
            verify: enums_1.UserVerifiStatus.Unverified
        });
        const { iat, exp } = await this.decodeRefreshToken(refreshToken);
        await database_services_1.default.refreshTokens.insertOne(new refreshToken_schema_1.default({ user_id: new mongodb_1.ObjectId(user_id), token: refreshToken, iat, exp }));
        console.log('email_verified_token: ', email_verified_token);
        return {
            accessToken,
            refreshToken,
            newUser: true,
            verify: crypto_2.verify
        };
    }
    async refreshToken({ user_id, refreshToken, verify, exp }) {
        console.log(exp);
        const [newAccessToken, newRefreshToken] = await Promise.all([
            this.signAccessToken({ user_id, verify }),
            this.signRefeshToken({ user_id, verify, exp }),
            database_services_1.default.refreshTokens.deleteOne({ token: refreshToken })
        ]);
        const decodeRefreshToken = await this.decodeRefreshToken(newRefreshToken);
        await database_services_1.default.refreshTokens.insertOne(new refreshToken_schema_1.default({
            user_id: new mongodb_1.ObjectId(user_id),
            token: newRefreshToken,
            iat: decodeRefreshToken.iat,
            exp: decodeRefreshToken.exp
        }));
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
    async checkEmailExist(email) {
        const result = await database_services_1.default.users.findOne({ email });
        return Boolean(result);
    }
    async login({ user_id, verify }) {
        verify = enums_1.UserVerifiStatus.Unverified;
        const [accessToken, refreshToken] = await this.signAccessAndRefeshToken({
            user_id: user_id,
            verify: verify
        });
        const { iat, exp } = await this.decodeRefreshToken(refreshToken);
        await database_services_1.default.refreshTokens.insertOne(new refreshToken_schema_1.default({ user_id: new mongodb_1.ObjectId(user_id), token: refreshToken, iat, exp }));
        return {
            accessToken,
            refreshToken
        };
    }
    async logout(refreshToken) {
        await database_services_1.default.refreshTokens.deleteOne({ token: refreshToken });
        return {
            message: messages_1.USER_MESSAGES.LOGOUT_SUCCESS
        };
    }
    async verifyEmail(user_id) {
        const [token] = await Promise.all([
            this.signAccessAndRefeshToken({
                user_id: user_id,
                verify: enums_1.UserVerifiStatus.Unverified
            }),
            database_services_1.default.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, [
                {
                    $set: {
                        email_verified_token: '',
                        verify: enums_1.UserVerifiStatus.Verified,
                        updated_at: '$$NOW'
                    }
                }
            ])
        ]);
        const [accessToken, refreshToken] = token;
        const { iat, exp } = await this.decodeRefreshToken(refreshToken);
        await database_services_1.default.refreshTokens.insertOne(new refreshToken_schema_1.default({ user_id: new mongodb_1.ObjectId(user_id), token: refreshToken, iat, exp }));
        return {
            accessToken,
            refreshToken
        };
    }
    async forgotPassword({ user_id, verify }) {
        const forgotPasswordToken = await this.signForgotPasswordToken({
            user_id: user_id,
            verify: verify
        });
        await database_services_1.default.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, [
            {
                $set: {
                    forgotPasswordToken,
                    updated_at: '$$NOW'
                }
            }
        ]);
        console.log('forgotPasswordToken: ', forgotPasswordToken);
        return {
            forgotPasswordToken
        };
    }
    async resetPassword(user_id, password) {
        await database_services_1.default.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, [
            {
                $set: {
                    forgotPasswordToken: '',
                    password: (0, crypto_1.hashPassword)(password),
                    updated_at: '$$NOW'
                }
            }
        ]);
        return {
            message: messages_1.USER_MESSAGES.RESET_PASSWORD_SUCCESS
        };
    }
    async getMe(user_id) {
        const user = await database_services_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) }, {
            projection: {
                password: 0,
                email_verified_token: 0,
                forgotPasswordToken: 0
            }
        });
        return user;
    }
    async updateMe(user_id, payload) {
        const _payload = payload.dateofbirth ? { ...payload, dateofbirth: new Date(payload.dateofbirth) } : payload;
        const result = await database_services_1.default.users.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(user_id)
        }, {
            $set: {
                ..._payload
            },
            $currentDate: {
                updated_at: true
            }
        }, {
            returnDocument: 'after',
            projection: {
                password: 0,
                email_verified_token: 0,
                forgot_password_token: 0
            }
        });
        return result;
    }
    async getProfile(username) {
        const user = await database_services_1.default.users.findOne({
            _id: new mongodb_1.ObjectId(username)
        }, {
            projection: {
                password: 0,
                email_verified_token: 0,
                forgot_password_token: 0,
                verify: 0,
                created_at: 0,
                updated_at: 0
            }
        });
        if (!user) {
            throw new Errors_1.ErrorsWithStatus({
                message: messages_1.USER_MESSAGES.USER_NOT_FOUND,
                status: httpStatus_1.default.NOT_FOUND
            });
        }
        return user;
    }
    async changePassword(user_id, newPassword) {
        await database_services_1.default.users.updateOne({ _id: new mongodb_1.ObjectId(user_id) }, {
            $set: {
                password: (0, crypto_1.hashPassword)(newPassword)
            },
            $currentDate: {
                updated_at: true
            }
        });
        return {
            message: messages_1.USER_MESSAGES.CHANGE_PASSWORD_SUCCESS
        };
    }
}
const userService = new UserService();
exports.default = userService;
