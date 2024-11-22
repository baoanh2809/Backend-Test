"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = exports.isProduction = void 0;
const dotenv_1 = require("dotenv");
const env = process.env.NODE_ENV;
const envFileName = `.env.${env}`;
if (!env) {
    console.log('Bạn chưa cài đặt biến môi trường NODE_ENV');
    process.exit(1);
}
if (!envFileName) {
    console.log('Không tìm thấy file cấu hình cho môi trường này');
    process.exit(1);
}
(0, dotenv_1.config)({
    path: envFileName
});
exports.isProduction = env === 'production';
exports.envConfig = {
    port: process.env.PORT,
    host: process.env.HOST,
    dbName: process.env.DB_NAME,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbArticlesCollection: process.env.DB_ARTICLE_COLLECTION,
    dbUsersCollection: process.env.DB_USERS_COLLECTION,
    dbFlolowersCollection: process.env.DB_FOLLOWERS_COLLECTION,
    dbVideoStatusCollection: process.env.DB_VIDEO_STATUS_COLLECTION,
    dbRefreshTokenCollection: process.env.DB_REFRESH_TOKEN_COLLECTION,
    dbBookmarksCollection: process.env.DB_BOOKMARK_COLLECTION,
    dbLikesCollection: process.env.DB_LIKES_COLLECTION,
    dbConversationCollection: process.env.DB_CONVERSATIONS_COLLECTION,
    dbHashtagsCollection: process.env.DB_HASHTAGS_COLLECTION,
    passwordSecret: process.env.PASSWORD_SECRET,
    jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN,
    jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN,
    jwtSecretEmailVerifyToken: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN,
    jwtSecretPasswordResetToken: process.env.JWT_SECRET_FORGOT_PASSWORD_VERIFY_TOKEN,
    refeshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    emailVerifyTokenExpiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN,
    forgotPasswordTokenExpiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN,
    //Google
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleAuthorizedRedirectURI: process.env.GOOGLE_AUTHORIZED_REDIRECT_URI,
    clientRedirectCallback: process.env.CLIENT_REDIRECT_CALLBACK,
    //AMZ
    amzAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    amzSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    amzRegion: process.env.AWS_REGION,
    //S3
    bucketName: process.env.S3_BUCKET_NAME,
    //AMZ SES
    sesFromAddress: process.env.SES_FROM_ADDRESS,
    clientURL: process.env.CLIENT_URL
};
