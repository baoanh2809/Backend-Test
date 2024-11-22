import { Router } from 'express'
import {
  forgotPasswordValidator,
  logginValidate,
  registerValidator,
  resetPasswordValidator,
  emailVerifyToken
} from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handlers'
import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
  verifyEmailController
} from '@/controllers/users.controllers'

const usersRouter = Router()

usersRouter.get('/test', (req, res) => {
  res.json({ message: 'Test router' })
})

/**
 * @swagger
 * paths:
 *  /api/users/register:
 *    post:
 *      tags:
 *        - users
 *      summary: Đăng ký tài khoản user
 *      description: Đăng ký vào hệ thống
 *      operation: register
 *      requestBody:
 *        description: Đăng ký
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/RegisterBody"
 *        required: true
 *      responses:
 *        "200":
 *          description: Đăng Ký thành công
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Register Success
 *                  result:
 *                    $ref: "#/components/schemas/SuccessRegisterAuthentication"
 *        "422":
 *          description: Invalid input
 */

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * @swagger
 * paths:
 *   /api/users/forgot-password:
 *     post:
 *       tags:
 *         - users
 *       summary: Forgot Password User
 *       description:  Forgot Password User
 *       operationId:  Forgot Password
 *       requestBody:
 *        description: Gửi yêu cầu reset password
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *                type: string
 *                example: tranbaoanh@gmail.com
 *       responses:
 *         default:
 *           description: Forgot Password User
 *           content:
 *             application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: CHECK EMAIL FORGOT PASSWORD
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
/**
 * @swagger
 * paths:
 *   /api/users/reset-password:
 *     post:
 *       tags:
 *         - users
 *       summary: Reset Password
 *       description: Reset Password
 *       operationId: Reset Password
 *       requestBody:
 *        description: Reset Password User
 *        content:
 *         application/json:
 *           schema:
 *            $ref: "#/components/schemas/resetPassword"
 *       responses:
 *         default:
 *           description:  Reset Password User
 *           content:
 *             application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Reset Password Success
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))
/**
 * @swagger
 * paths:
 *  /api/users/login:
 *    post:
 *      tags:
 *        - users
 *      summary: Đăng Nhập
 *      description: Đăng nhập vào hệ thống
 *      operation: login
 *      requestBody:
 *        description: Thông tin đăng nhập
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/LoginBody"
 *        required: true
 *      responses:
 *        "200":
 *          description: Đăng nhập thành công
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Login success
 *                  result:
 *                    $ref: "#/components/schemas/SuccessAuthentication"
 *        "422":
 *          description: Invalid input
 */
usersRouter.post('/login', logginValidate, wrapRequestHandler(loginController))

/**
 * @swagger
 * paths:
 *   /api/users/verify-email:
 *     post:
 *       tags:
 *         - users
 *       summary: Verify Email User
 *       description: Verify Email User
 *       operationId: VerifyEmail
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *        description: Xác thực Email User
 *        content:
 *         application/json:
 *           schema:
 *            type: object
 *          properties:
 *           email:
 *        required: true
 *       responses:
 *         default:
 *           description: Xác thực Email User
 *           content:
 *             application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Email verified success
 */
usersRouter.post('/verify-email', emailVerifyToken, wrapRequestHandler(verifyEmailController))

export default usersRouter
