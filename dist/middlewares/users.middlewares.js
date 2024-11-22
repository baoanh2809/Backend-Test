"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerifyToken = exports.isUserLoggedInValidator = exports.changePasswordValidator = exports.checkRoleValidator = exports.verifiedUserValidator = exports.resetPasswordValidator = exports.verifyForgotPasswordToken = exports.forgotPasswordValidator = exports.refreshTokenValidator = exports.accessTokenValidator = exports.registerValidator = exports.logginValidate = void 0;
const express_validator_1 = require("express-validator");
const validation_1 = require("../utils/validation");
const database_services_1 = __importDefault(require("../services/database.services"));
const users_services_1 = __importDefault(require("../services/users.services"));
const Errors_1 = require("../models/Errors");
const messages_1 = require("../constants/messages");
const crypto_1 = require("../utils/crypto");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const lodash_1 = require("lodash");
const mongodb_1 = require("mongodb");
const enums_1 = require("../constants/enums");
const commons_1 = require("../utils/commons");
const passwordSchema = {
    notEmpty: {
        errorMessage: messages_1.USER_MESSAGES.PASSWORD_IS_REQUIRED
    },
    isString: {
        errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRING
    },
    isLength: {
        options: {
            min: 6,
            max: 30
        },
        errorMessage: messages_1.USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_6_TO_30
    },
    isStrongPassword: {
        options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRONG
    }
};
const confirmPasswordSchema = (key) => ({
    notEmpty: {
        errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
    },
    isString: {
        errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRING
    },
    isLength: {
        options: {
            min: 6,
            max: 30
        },
        errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_6_TO_30
    },
    isStrongPassword: {
        options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
    },
    custom: {
        options: (value, { req }) => {
            if (value !== req.body[key]) {
                throw new Error(messages_1.USER_MESSAGES.CONFIRM_PASSWORD_IS_NOT_MATCH);
            }
            return true;
        }
    }
});
const forgotPasswordSchema = {
    trim: true,
    custom: {
        options: async (value, { req }) => {
            if (!value) {
                throw new Errors_1.ErrorsWithStatus({
                    message: messages_1.USER_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_REQUIRED,
                    status: httpStatus_1.default.UNAUTHORIZED
                });
            }
            try {
                const decoded_forgot_password_token = await (0, jwt_1.verifyToken)({
                    token: value,
                    secretOrPublicKey: process.env.JWT_SECRET_FORGOT_PASSWORD_VERIFY_TOKEN
                });
                const { user_id } = decoded_forgot_password_token;
                const user = await database_services_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
                req.decoded_forgot_password_token = decoded_forgot_password_token;
                if (user === null) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.USER_NOT_FOUND,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                if (user.forgotPasswordToken !== value) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.INVALID_PASSWORD_TOKEN,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: (0, lodash_1.capitalize)(err.message),
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                throw err;
            }
            return true;
        }
    }
};
const nameSchema = {
    notEmpty: {
        errorMessage: messages_1.USER_MESSAGES.NAME_IS_REQUIRED
    },
    isString: {
        errorMessage: messages_1.USER_MESSAGES.NAME_MUST_BE_STRING
    },
    trim: true,
    isLength: {
        options: {
            min: 1,
            max: 100
        },
        errorMessage: messages_1.USER_MESSAGES.NAME_LENGTH_MUST_BE_1_TO_100
    }
};
const dateOfBirthSchema = {
    isISO8601: {
        options: {
            strict: true,
            strictSeparator: true
        }
    },
    errorMessage: messages_1.USER_MESSAGES.DATE_OF_BIRTH_MUST_BE_ISO08601
};
exports.logginValidate = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        isEmail: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const user = await database_services_1.default.users.findOne({
                    email: value,
                    password: (0, crypto_1.hashPassword)(req.body.password)
                });
                if (user === null) {
                    throw new Error(messages_1.USER_MESSAGES.USER_NOT_FOUND);
                }
                req.user = user;
                return true;
            }
        }
    },
    password: {
        isString: {
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRING
        },
        isLength: {
            options: {
                min: 6,
                max: 30
            },
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_6_TO_30
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
    }
}, ['body']));
exports.registerValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    name: nameSchema,
    email: {
        notEmpty: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
            errorMessage: messages_1.USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
            options: async (value) => {
                const isExistEmail = await users_services_1.default.checkEmailExist(value);
                if (isExistEmail) {
                    throw new Error(messages_1.USER_MESSAGES.EMAIL_ALREADY_EXISTS);
                }
                return true;
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRING
        },
        isLength: {
            options: {
                min: 6,
                max: 30
            },
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_LENGTH_MUST_BE_6_TO_30
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: messages_1.USER_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
            errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRING
        },
        isLength: {
            options: {
                min: 6,
                max: 30
            },
            errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_6_TO_30
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: messages_1.USER_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(messages_1.USER_MESSAGES.CONFIRM_PASSWORD_IS_NOT_MATCH);
                }
                return true;
            }
        }
    },
    dateofbirth: dateOfBirthSchema
}, ['body']));
exports.accessTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                return await (0, commons_1.verifyAccessToken)(access_token, req);
            }
        }
    }
}, ['headers']));
exports.refreshTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    refreshToken: {
        trim: true,
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                try {
                    const [decoded_refresh_token, refresh_token] = await Promise.all([
                        (0, jwt_1.verifyToken)({ token: value, secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN }),
                        database_services_1.default.refreshTokens.findOne({ token: value })
                    ]);
                    req.decoded_refresh_token = decoded_refresh_token;
                    if (refresh_token === null) {
                        throw new Errors_1.ErrorsWithStatus({
                            message: messages_1.USER_MESSAGES.USER_REFRESH_TOKEN_IS_NOT_EXIST,
                            status: httpStatus_1.default.UNAUTHORIZED
                        });
                    }
                }
                catch (err) {
                    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                        throw new Errors_1.ErrorsWithStatus({
                            message: (0, lodash_1.capitalize)(err.message),
                            status: httpStatus_1.default.UNAUTHORIZED
                        });
                    }
                    throw err;
                }
                return true;
            }
        }
    }
}, ['body']));
exports.forgotPasswordValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const user = await database_services_1.default.users.findOne({ email: value });
                if (user === null) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.USER_NOT_FOUND,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                req.user = user;
                return true;
            }
        }
    }
}, ['body']));
exports.verifyForgotPasswordToken = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    forgotPasswordToken: forgotPasswordSchema
}, ['body']));
exports.resetPasswordValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema('password'),
    forgotPasswordToken: forgotPasswordSchema
}));
const verifiedUserValidator = async (req, res, next) => {
    const { user_id } = req.decoded_authorization;
    const user = await database_services_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
    if (user?.verify !== enums_1.UserVerifiStatus.Verified) {
        return next(new Errors_1.ErrorsWithStatus({
            message: messages_1.USER_MESSAGES.USER_NOT_VERIFIED,
            status: httpStatus_1.default.FORBIDDEN
        }));
    }
    next();
};
exports.verifiedUserValidator = verifiedUserValidator;
const checkRoleValidator = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const { user_id } = req.decoded_authorization;
            const user = await database_services_1.default.users.findOne({ _id: new mongodb_1.ObjectId(user_id) });
            if (!user || !allowedRoles.includes(user?.role)) {
                throw new Errors_1.ErrorsWithStatus({
                    message: messages_1.USER_MESSAGES.USER_NOT_AUTHORIZED,
                    status: httpStatus_1.default.FORBIDDEN
                });
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.checkRoleValidator = checkRoleValidator;
exports.changePasswordValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    old_password: {
        ...passwordSchema,
        custom: {
            options: async (value, { req }) => {
                const { user_id } = req.decoded_authorization;
                const user = await database_services_1.default.users.findOne({
                    _id: new mongodb_1.ObjectId(user_id),
                    password: (0, crypto_1.hashPassword)(value)
                });
                if (!user) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.OLD_PASSWORD_IS_INVALID,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                const { password } = user;
                const isMatch = (0, crypto_1.hashPassword)(value) === password;
                if (!isMatch) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.OLD_PASSWORD_NOT_MATCH,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                return true;
            }
        }
    },
    new_password: passwordSchema,
    confirm_new_password: confirmPasswordSchema('new_password')
}));
const isUserLoggedInValidator = (middleware) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            return middleware(req, res, next);
        }
        next();
    };
};
exports.isUserLoggedInValidator = isUserLoggedInValidator;
exports.emailVerifyToken = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email_verify_token: {
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: messages_1.USER_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                try {
                    const decoded_email_veridy_token = await (0, jwt_1.verifyToken)({
                        token: value,
                        secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN
                    });
                    req.decoded_email_veridy_token = decoded_email_veridy_token;
                }
                catch (err) {
                    throw new Errors_1.ErrorsWithStatus({
                        message: (0, lodash_1.capitalize)(err.message),
                        status: httpStatus_1.default.UNAUTHORIZED
                    });
                }
                return true;
            }
        }
    }
}, ['body']));
