"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const crypto_1 = require("crypto");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function sha256(content) {
    return (0, crypto_1.createHash)('sha256').update(content).digest('hex');
}
function hashPassword(password) {
    return sha256(password + process.env.PASSWORD_SECRET);
}
