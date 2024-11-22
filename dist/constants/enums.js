"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleFollow = exports.TweetAudience = exports.TweetType = exports.MediaQuery = exports.EncodingStatus = exports.MediaType = exports.TokenTypes = exports.UserRoles = exports.UserVerifiStatus = void 0;
var UserVerifiStatus;
(function (UserVerifiStatus) {
    UserVerifiStatus[UserVerifiStatus["Unverified"] = 0] = "Unverified";
    UserVerifiStatus[UserVerifiStatus["Verified"] = 1] = "Verified";
    UserVerifiStatus[UserVerifiStatus["Banned"] = 2] = "Banned";
})(UserVerifiStatus || (exports.UserVerifiStatus = UserVerifiStatus = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Admin"] = 0] = "Admin";
    UserRoles[UserRoles["Editor"] = 1] = "Editor";
    UserRoles[UserRoles["User"] = 2] = "User";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
var TokenTypes;
(function (TokenTypes) {
    TokenTypes[TokenTypes["AccessToken"] = 0] = "AccessToken";
    TokenTypes[TokenTypes["RefreshToken"] = 1] = "RefreshToken";
    TokenTypes[TokenTypes["ForgotPasswordToken"] = 2] = "ForgotPasswordToken";
    TokenTypes[TokenTypes["EmailVerifyToken"] = 3] = "EmailVerifyToken";
})(TokenTypes || (exports.TokenTypes = TokenTypes = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["Image"] = 0] = "Image";
    MediaType[MediaType["Video"] = 1] = "Video";
    MediaType[MediaType["HLS"] = 2] = "HLS";
})(MediaType || (exports.MediaType = MediaType = {}));
var EncodingStatus;
(function (EncodingStatus) {
    EncodingStatus[EncodingStatus["Pending"] = 0] = "Pending";
    EncodingStatus[EncodingStatus["Processing"] = 1] = "Processing";
    EncodingStatus[EncodingStatus["Success"] = 2] = "Success";
    EncodingStatus[EncodingStatus["Failed"] = 3] = "Failed"; // encoding failed
})(EncodingStatus || (exports.EncodingStatus = EncodingStatus = {}));
var MediaQuery;
(function (MediaQuery) {
    MediaQuery["Image"] = "image";
    MediaQuery["Video"] = "video";
})(MediaQuery || (exports.MediaQuery = MediaQuery = {}));
var TweetType;
(function (TweetType) {
    TweetType[TweetType["Tweet"] = 0] = "Tweet";
    TweetType[TweetType["ReTweet"] = 1] = "ReTweet";
    TweetType[TweetType["Comment"] = 2] = "Comment";
    TweetType[TweetType["QuoteTweet"] = 3] = "QuoteTweet";
})(TweetType || (exports.TweetType = TweetType = {}));
var TweetAudience;
(function (TweetAudience) {
    TweetAudience[TweetAudience["Everyone"] = 0] = "Everyone";
    TweetAudience[TweetAudience["TwitterCircle"] = 1] = "TwitterCircle";
})(TweetAudience || (exports.TweetAudience = TweetAudience = {}));
var PeopleFollow;
(function (PeopleFollow) {
    PeopleFollow["Anyone"] = "0";
    PeopleFollow["Following"] = "1";
})(PeopleFollow || (exports.PeopleFollow = PeopleFollow = {}));
