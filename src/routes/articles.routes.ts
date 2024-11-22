import { UserRoles } from '@/constants/enums'
import {
  getNewFeedsController,
  createArticleController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController
} from '@/controllers/articles.controllers'
import { accessTokenValidator, checkRoleValidator, verifiedUserValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
import { Router } from 'express'

const articlesRouter = Router()

articlesRouter.get('/test', (req, res) => {
  res.json({ message: 'Test router' })
})

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


articlesRouter.get(
  '/:article_id',
  accessTokenValidator,
  verifiedUserValidator,
  checkRoleValidator([UserRoles.Admin, UserRoles.User, UserRoles.Editor]),
  wrapRequestHandler(getArticleByIdController)
)



articlesRouter.get('/', wrapRequestHandler(getNewFeedsController))

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
articlesRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  checkRoleValidator([UserRoles.Admin]),
  wrapRequestHandler(createArticleController)
)

articlesRouter.patch(
  '/:article_id',
  accessTokenValidator,
  verifiedUserValidator,
  checkRoleValidator([UserRoles.Admin, UserRoles.Editor]),
  wrapRequestHandler(updateArticleController)
)

articlesRouter.delete(
  '/:article_id',
  accessTokenValidator,
  verifiedUserValidator,
  checkRoleValidator([UserRoles.Admin]),
  wrapRequestHandler(deleteArticleController)
)

export default articlesRouter
