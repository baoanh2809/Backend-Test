import { MongoClient, Db, Collection } from 'mongodb'
import User from '@/models/schemas/User.schema'
import RefreshToken from '@/models/schemas/refreshToken.schema'
import { envConfig } from '@/constants/config'
import Articles from '@/models/schemas/Articles.schema'

const uri = `mongodb+srv://${envConfig.dbUserName}:${envConfig.dbPassword}@cluster0.brqve.mongodb.net/`
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${envConfig.dbName}`)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  async indexUsers() {
    const exist = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])
    if (!exist) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 }, { unique: true })
    }
  }

  async indexRefreshTokens() {
    const exist = await this.users.indexExists(['exp1', 'token_1'])
    if (!exist) {
      this.refreshTokens.createIndex({ token: 1 })
      this.refreshTokens.createIndex(
        { exp: 1 },
        {
          expireAfterSeconds: 0
        }
      )
    }
  }

  get users(): Collection<User> {
    return this.db.collection(`${envConfig.dbUsersCollection}`)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(`${envConfig.dbRefreshTokenCollection}`)
  }

  get articles(): Collection<Articles> {
    return this.db.collection(`${envConfig.dbArticlesCollection}`)
  }
}

const databaseService = new DatabaseService()
export default databaseService
