"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("@/constants/config");
const uri = `mongodb+srv://${config_1.envConfig.dbUserName}:${config_1.envConfig.dbPassword}@cluster0.brqve.mongodb.net/`;
class DatabaseService {
    client;
    db;
    constructor() {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(`${config_1.envConfig.dbName}`);
    }
    async connect() {
        try {
            // Send a ping to confirm a successful connection
            await this.db.command({ ping: 1 });
            console.log('Pinged your deployment. You successfully connected to MongoDB!');
        }
        catch (error) {
            console.log('Error', error);
            throw error;
        }
    }
    async indexUsers() {
        const exist = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1']);
        if (!exist) {
            this.users.createIndex({ email: 1, password: 1 });
            this.users.createIndex({ email: 1 }, { unique: true });
            this.users.createIndex({ username: 1 }, { unique: true });
        }
    }
    async indexRefreshTokens() {
        const exist = await this.users.indexExists(['exp1', 'token_1']);
        if (!exist) {
            this.refreshTokens.createIndex({ token: 1 });
            this.refreshTokens.createIndex({ exp: 1 }, {
                expireAfterSeconds: 0
            });
        }
    }
    get users() {
        return this.db.collection(`${config_1.envConfig.dbUsersCollection}`);
    }
    get refreshTokens() {
        return this.db.collection(`${config_1.envConfig.dbRefreshTokenCollection}`);
    }
    get articles() {
        return this.db.collection(`${config_1.envConfig.dbArticlesCollection}`);
    }
}
const databaseService = new DatabaseService();
exports.default = databaseService;
