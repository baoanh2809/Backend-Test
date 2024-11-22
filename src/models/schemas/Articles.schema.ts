import { ObjectId } from 'mongodb'

interface ArticleContructor {
  _id?: ObjectId
  user_id: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
  deleted?: boolean
}

export default class Articles {
  _id?: ObjectId
  user_id: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
  deleted?: boolean
  constructor({ updated_at, content, created_at, user_id }: ArticleContructor) {
    const date = new Date()
    this._id = new ObjectId()
    this.user_id = user_id
    this.content = content
    this.deleted = false
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}
