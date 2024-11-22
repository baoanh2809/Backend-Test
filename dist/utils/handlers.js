"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequestHandler = void 0;
const wrapRequestHandler = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
};
exports.wrapRequestHandler = wrapRequestHandler;
