import { Application, Router } from 'express'
import pathsRoutes from '@/constants/paths'
export function routes(app: Application): void {
  const apiV1Router = Router()
  apiV1Router.use(pathsRoutes.user.root, pathsRoutes.user.routes)
  apiV1Router.use(pathsRoutes.article.root, pathsRoutes.article.routes)
  app.use('/api', apiV1Router)
}
