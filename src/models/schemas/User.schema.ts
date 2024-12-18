import { ObjectId } from 'mongodb'
import { UserVerifiStatus, UserRoles } from '@/constants/enums'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  dateofbirth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verified_token?: string
  forgotPasswordToken?: string
  verify?: UserVerifiStatus
  role?: UserRoles
  username?: string
  avatar?: string
  cover_photo?: string
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  dateofbirth: Date
  password: string
  created_at: Date
  updated_at: Date
  role: UserRoles
  email_verified_token: string
  forgotPasswordToken: string
  verify: UserVerifiStatus
  username: string
  avatar: string
  cover_photo: string

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.email = user.email
    this.dateofbirth = user.dateofbirth || new Date()
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verified_token = user.email_verified_token || ''
    this.forgotPasswordToken = user.forgotPasswordToken || ''
    this.verify = user.verify || UserVerifiStatus.Unverified
    this.role = user.role || UserRoles.User
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
  }
}
