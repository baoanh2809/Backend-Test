"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../constants/enums");
const articles_controllers_1 = require("../controllers/articles.controllers");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const express_1 = require("express");
const articlesRouter = (0, express_1.Router)();
articlesRouter.get('/test', (req, res) => {
    res.json({ message: 'Test router' });
});
/**
 * @swagger
 * paths:
 *    /api/articles/{article_id}:
 *      get:
 *        tags:
 *          - Articles
 *        summary: Get Article
 *        description: Get Articles
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - name: article_id
 *            in: path
 *            description: ID of Articles that needs to be fetched
 *            required: true
 *            schema:
 *              type: string
 *              format: MongoId
 *        responses:
 *          '200':
 *            description: Get Articles Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     message:
 *                        type: string
 *                        example: "Get Articles successfully"
 *                     result:
 *                        $ref: "#/components/schemas/GetArticlesSucess"
 *          '404':
 *            description: Articles not public. You need to login to see this Articles
 *      delete:
 *        tags:
 *          - Articles
 *        summary: Delete Article
 *        description: Delete Article
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - name: article_id
 *            in: path
 *            description: ID of Articles that needs to be fetched
 *            required: true
 *            schema:
 *              type: string
 *              format: MongoId
 *        responses:
 *          '200':
 *            description: Delete Article Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     result:
 *                        $ref: "#/components/schemas/DeleteArticlesSucess"
 *          '403':
 *            description: Forbidden - Only Admins can delete articles
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "User not authorized"
 *      put:
 *        tags:
 *          - Articles
 *        summary: Delete Article one time
 *        description: The first time you delete an article, it will be moved to the trash. The second time you delete it, it will be deleted permanently.
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - name: article_id
 *            in: path
 *            description: ID of Articles that needs to be fetched
 *            required: true
 *            schema:
 *              type: string
 *              format: MongoId
 *        responses:
 *          '200':
 *            description: Patch Article Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     message:
 *                        type: string
 *                        example: "Article deleted successfully"
 *          '403':
 *            description: Forbidden - Only Admins can delete articles
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "User not authorized"
 *      patch:
 *        tags:
 *          - Articles
 *        summary: Update Article
 *        description: Update Article
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - name: article_id
 *            in: path
 *            description: ID of Articles that needs to be fetched
 *            required: true
 *            schema:
 *              type: string
 *              format: MongoId
 *        responses:
 *          '200':
 *            description: Patch Article Success
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     result:
 *                        $ref: "#/components/schemas/UpdateArticlesSucess"
 *          '403':
 *            description: Forbidden - Only Admins and Editor can update articles
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "User not authorized"
 */
articlesRouter.get('/:article_id', users_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, (0, users_middlewares_1.checkRoleValidator)([enums_1.UserRoles.Admin, enums_1.UserRoles.User, enums_1.UserRoles.Editor]), (0, handlers_1.wrapRequestHandler)(articles_controllers_1.getArticleByIdController));
articlesRouter.get('/', (0, handlers_1.wrapRequestHandler)(articles_controllers_1.getNewFeedsController));
/**
 * @swagger
 * paths:
 *    /api/articles:
 *      post:
 *        tags:
 *          - Articles
 *        summary: Create an article
 *        description: Only users with the Admin role can create an article.
 *        security:
 *          - BearerAuth: []
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  content:
 *                    type: string
 *        responses:
 *          '201':
 *            description: Article created successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Article created successfully"
 *                    result:
 *                      $ref: "#/components/schemas/GetArticlesSucess"
 *          '403':
 *            description: Forbidden - Only Admins can create articles
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "User not authorized"
 *      get:
 *        tags:
 *        - Articles
 *        summary: Get All Feeds
 *        description: Get All Feeds
 *        security:
 *          - BearerAuth: []
 *        responses:
 *          '200':
 *            description: Get All Feeds successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                     message:
 *                        type: string
 *                        example: "Get All Feeds Successfully"
 *                     result:
 *                        type: object
 *                        properties:
 *                          Articless:
 *                            $ref: "#/components/schemas/GetArticlesSucess"
 *          '404':
 *            description: Articles not found
 */
articlesRouter.post('/', users_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, (0, users_middlewares_1.checkRoleValidator)([enums_1.UserRoles.Admin]), (0, handlers_1.wrapRequestHandler)(articles_controllers_1.createArticleController));
articlesRouter.patch('/:article_id', users_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, (0, users_middlewares_1.checkRoleValidator)([enums_1.UserRoles.Admin, enums_1.UserRoles.Editor]), (0, handlers_1.wrapRequestHandler)(articles_controllers_1.updateArticleController));
articlesRouter.delete('/:article_id', users_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, (0, users_middlewares_1.checkRoleValidator)([enums_1.UserRoles.Admin]), (0, handlers_1.wrapRequestHandler)(articles_controllers_1.deleteArticleController));
exports.default = articlesRouter;
