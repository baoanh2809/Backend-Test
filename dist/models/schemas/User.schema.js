"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("@/constants/enums");
class User {
    _id;
    name;
    email;
    dateofbirth;
    password;
    created_at;
    updated_at;
    role;
    email_verified_token;
    forgotPasswordToken;
    verify;
    username;
    avatar;
    cover_photo;
    constructor(user) {
        const date = new Date();
        this._id = user._id;
        this.name = user.name || '';
        this.email = user.email;
        this.dateofbirth = user.dateofbirth || new Date();
        this.password = user.password;
        this.created_at = user.created_at || date;
        this.updated_at = user.updated_at || date;
        this.email_verified_token = user.email_verified_token || '';
        this.forgotPasswordToken = user.forgotPasswordToken || '';
        this.verify = user.verify || enums_1.UserVerifiStatus.Unverified;
        this.role = user.role || enums_1.UserRoles.User;
        this.username = user.username || '';
        this.avatar = user.avatar || '';
        this.cover_photo = user.cover_photo || '';
    }
}
exports.default = User;
