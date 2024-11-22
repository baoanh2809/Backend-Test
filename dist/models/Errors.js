"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityError = exports.ErrorsWithStatus = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
class ErrorsWithStatus {
    message;
    status;
    constructor({ message, status }) {
        this.message = message;
        this.status = status;
    }
}
exports.ErrorsWithStatus = ErrorsWithStatus;
class EntityError extends ErrorsWithStatus {
    errors;
    constructor({ message = messages_1.USER_MESSAGES.VALIDATION_ERROR, errors }) {
        super({ message, status: httpStatus_1.default.UNPROCESSABLE_ENTITY });
        this.errors = errors;
    }
}
exports.EntityError = EntityError;
