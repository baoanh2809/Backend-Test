"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Articles {
    _id;
    user_id;
    content;
    created_at;
    updated_at;
    deleted;
    constructor({ updated_at, content, created_at, user_id }) {
        const date = new Date();
        this._id = new mongodb_1.ObjectId();
        this.user_id = user_id;
        this.content = content;
        this.deleted = false;
        this.created_at = created_at || date;
        this.updated_at = updated_at || date;
    }
}
exports.default = Articles;
