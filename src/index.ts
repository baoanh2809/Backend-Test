import express from 'express'
import { routes } from './routes/index.routes'
import bodyParser from 'body-parser'
import databaseService from '@/services/database.services'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()
const port = 3000

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BE API',
      version: '1.0.0',
      description: 'BE API',
      contact: {
        name: 'BE-Test',
        email: 'tranbaoanh@gmail.com'
      }
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerformat: 'JWT'
        }
      }
    },
    servers: [
      {
        url: 'https://tranbaoanh.io.vn'
      }
    ]
  },
  apis: ['./src/routes/*.routes.ts', './src/models/requests/*.requests.ts']
}

const swaggerSpecification = swaggerJSDoc(swaggerOptions)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
routes(app)
databaseService.connect().then(() => {
  databaseService.indexUsers()
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification))
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})