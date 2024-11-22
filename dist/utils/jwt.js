"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const signToken = ({ payload, privateKey, option = {
    algorithm: 'HS256'
} }) => {
    return new Promise((resolve, rejects) => {
        jsonwebtoken_1.default.sign(payload, privateKey, option, (err, token) => {
            if (err) {
                throw rejects(err);
            }
            resolve(token);
        });
    });
};
exports.signToken = signToken;
const verifyToken = ({ token, secretOrPublicKey }) => {
    return new Promise((resolve, rejects) => {
        jsonwebtoken_1.default.verify(token, secretOrPublicKey, (err, decoded) => {
            if (err) {
                throw rejects(err);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
