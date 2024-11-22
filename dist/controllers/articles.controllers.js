"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleController = exports.updateArticleController = exports.getArticleByIdController = exports.createArticleController = exports.getNewFeedsController = void 0;
const articles_services_1 = __importDefault(require("../services/articles.services"));
// import arti
const getNewFeedsController = async (req, res) => {
    const result = await articles_services_1.default.getAllArticles();
    return res.json({
        message: 'get new feeds successfully',
        result
    });
};
exports.getNewFeedsController = getNewFeedsController;
const createArticleController = async (req, res) => {
    const { user_id } = req.decoded_authorization;
    const { content } = req.body;
    const result = await articles_services_1.default.createArticle({
        user_id,
        content
    });
    return res.json({
        message: 'create article successfully',
        result
    });
};
exports.createArticleController = createArticleController;
const getArticleByIdController = async (req, res) => {
    const { article_id } = req.params;
    const result = await articles_services_1.default.getArticleById(article_id);
    return res.json({
        message: 'get article by id successfully',
        result
    });
};
exports.getArticleByIdController = getArticleByIdController;
const updateArticleController = async (req, res) => {
    const { article_id } = req.params;
    const { content } = req.body;
    const result = await articles_services_1.default.updateArticle(article_id, content);
    return res.json({
        message: 'update article successfully',
        result
    });
};
exports.updateArticleController = updateArticleController;
const deleteArticleController = async (req, res) => {
    const { article_id } = req.params;
    const result = await articles_services_1.default.deleteArticle(article_id);
    return res.json({ message: result.message, result });
};
exports.deleteArticleController = deleteArticleController;
