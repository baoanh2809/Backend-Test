import databaseService from '@/services/database.services'
import { ObjectId } from 'mongodb'

class ArticlesService {
  async getArticleById(id: string) {
    const result = await databaseService.articles.findOne({ _id: new ObjectId(id) })
    return result
  }

  async createArticle({ user_id, content }: { user_id: string, content: string }) {
    const result = await databaseService.articles.insertOne({
      user_id: new ObjectId(user_id),
      content,
      created_at: new Date()
    })
    return result
  }

  async getAllArticles() {
    const result = await databaseService.articles.find().toArray()
    return result
  }

  async updateArticle(id: string, content: string) {
    const result = await databaseService.articles.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          content,
          updated_at: new Date()
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return result
  }

  async deleteArticle(id: string) {
    const article = await databaseService.articles.findOne({ _id: new ObjectId(id) })
    console.log(article)
    if (article && article.deleted) {
      console.log(123)
      const result = await databaseService.articles.deleteOne({ _id: new ObjectId(id) })
      console.log(result)
      return { message: 'Article deleted successfully', result }
    } else {
      const result = await databaseService.articles.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            deleted: true
          }
        }
      )
      return { message: 'Article marked as deleted. Delete again to permanently remove.', result }
    }
  }
}

const articlesService = new ArticlesService()
export default articlesService