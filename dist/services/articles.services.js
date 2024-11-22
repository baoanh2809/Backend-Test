"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_services_1 = __importDefault(require("@/services/database.services"));
const mongodb_1 = require("mongodb");
class ArticlesService {
    async getArticleById(id) {
        const result = await database_services_1.default.articles.findOne({ _id: new mongodb_1.ObjectId(id) });
        return result;
    }
    async createArticle({ user_id, content }) {
        const result = await database_services_1.default.articles.insertOne({
            user_id: new mongodb_1.ObjectId(user_id),
            content,
            created_at: new Date()
        });
        return result;
    }
    async getAllArticles() {
        const result = await database_services_1.default.articles.find().toArray();
        return result;
    }
    async updateArticle(id, content) {
        const result = await database_services_1.default.articles.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                content,
                updated_at: new Date()
            }
        }, {
            returnDocument: 'after'
        });
        return result;
    }
    async deleteArticle(id) {
        const article = await database_services_1.default.articles.findOne({ _id: new mongodb_1.ObjectId(id) });
        console.log(article);
        if (article && article.deleted) {
            console.log(123);
            const result = await database_services_1.default.articles.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            console.log(result);
            return { message: 'Article deleted successfully', result };
        }
        else {
            const result = await database_services_1.default.articles.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    deleted: true
                }
            });
            return { message: 'Article marked as deleted. Delete again to permanently remove.', result };
        }
    }
}
const articlesService = new ArticlesService();
exports.default = articlesService;
