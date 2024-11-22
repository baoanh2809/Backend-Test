import { ParamsDictionary } from 'express-serve-static-core'

/**
 * @swagger
 * components:
 *  schemas:
 *    ArticlesBody:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *          example: 'This is a Articles'
 *    PostArticlesSucess:
 *      type: object
 *      properties:
 *        _id:
 *           type: string
 *           format: MongoID
 *           example: '65fada2481786c414cb45039'
 *        user_id:
 *           type: string
 *           format: MongoID
 *           example: '65fada2481786c414cb45039'
 *        content:
 *           type: string
 *           example: 'This is a Articles'
 *        deleted:
 *           type: boolean
 *           example: false
 *        updated_at:
 *           type: ISO8601
 *           example: '2021-08-20T07:00:00.000Z'
 *        created_at:
 *          type: ISO8601
 *          example: '2021-07-20T07:00:00.000Z'
 *    GetArticlesSucess:
 *      type: object
 *      properties:
 *        _id:
 *           type: string
 *           format: MongoID
 *           example: '65fada2481786c414cb45039'
 *        user_id:
 *           type: string
 *           format: MongoID
 *           example: '65fada2481786c414cb45039'
 *        content:
 *           type: string
 *           example: 'This is a Articles'
 *        deleted:
 *           type: boolean
 *           example: false
 *        updated_at:
 *           type: ISO8601
 *           example: '2021-08-20T07:00:00.000Z'
 *        created_at:
 *          type: ISO8601
 *          example: '2021-07-20T07:00:00.000Z'
 *    UpdateArticlesSucess:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          format: MongoID
 *          example: '65fada2481786c414cb45039'
 *        user_id:
 *          type: string
 *          format: MongoID
 *          example: '65fada2481786c414cb45039'
 *        content:
 *          type: string
 *          example: 'This is a Articles'
 *        deleted:
 *            type: boolean
 *            example: false
 *        updated_at:
 *          type: ISO8601
 *          example: '2021-08-20T07:00:00.000Z'
 *        created_at:
 *          type: ISO8601
 *          example: '2021-07-20T07:00:00.000Z'
 *    DeleteArticlesSucess:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: 'Delete Articles successfully'
 */

export interface ArticlesParam extends ParamsDictionary {
  article_id: string
}
