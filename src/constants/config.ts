import { config } from 'dotenv'
const env = process.env.NODE_ENV

const envFileName = `.env.${env}`
if (!env) {
  console.log('Bạn chưa cài đặt biến môi trường NODE_ENV')
  process.exit(1)
}

if (!envFileName) {
  console.log('Không tìm thấy file cấu hình cho môi trường này')
  process.exit(1)
}

config({
  path: envFileName
})

export const isProduction = env === 'production'

export const envConfig = {
  port: process.env.PORT as string,
  dbName: process.env.DB_NAME as string,
  dbUserName: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbArticlesCollection: process.env.DB_ARTICLE_COLLECTION as string,
  dbUsersCollection: process.env.DB_USERS_COLLECTION as string,
  dbRefreshTokenCollection: process.env.DB_REFRESH_TOKEN_COLLECTION as string,
  passwordSecret: process.env.PASSWORD_SECRET as string,
  jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN as string,
  jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN as string,
  jwtSecretEmailVerifyToken: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
  jwtSecretPasswordResetToken: process.env.JWT_SECRET_FORGOT_PASSWORD_VERIFY_TOKEN as string,
  refeshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as string,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as string,
  emailVerifyTokenExpiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN as string,
  forgotPasswordTokenExpiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN as string,
}
