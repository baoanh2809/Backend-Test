"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathsRoutes = void 0;
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const articles_routes_1 = __importDefault(require("../routes/articles.routes"));
exports.pathsRoutes = {
    user: {
        root: '/users',
        routes: users_routes_1.default
    },
    article: {
        root: '/articles',
        routes: articles_routes_1.default
    }
};
exports.default = exports.pathsRoutes;
