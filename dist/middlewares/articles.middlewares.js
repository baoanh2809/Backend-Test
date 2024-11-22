"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidator = void 0;
const express_validator_1 = require("express-validator");
const validation_1 = require("@/utils/validation");
exports.paginationValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    limit: {
        isNumeric: true,
        custom: {
            options: (value, { req }) => {
                const num = Number(value);
                if (num > 100 || num < 1) {
                    throw new Error('Limit must be between 1 and 100');
                }
                return true;
            }
        }
    },
    page: {
        isNumeric: true,
        custom: {
            options: (value, { req }) => {
                const num = Number(value);
                if (num < 1) {
                    throw new Error('Page >= 1');
                }
                return true;
            }
        }
    }
}, ['query']));
