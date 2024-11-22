import usersRouter from '@/routes/users.routes'
import articlesRouter from '@/routes/articles.routes'
export const pathsRoutes = {
  user: {
    root: '/users',
    routes: usersRouter
  },
  article: {
    root: '/articles',
    routes: articlesRouter
  }
}

export default pathsRoutes
