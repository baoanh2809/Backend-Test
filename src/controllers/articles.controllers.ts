import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '@/models/requests/User.requests'
import articlesService from '@/services/articles.services'
import { ArticlesParam } from '@/models/requests/Articles.requests'
// import arti

export const getNewFeedsController = async (req: Request, res: Response): Promise<any> => {
  const result = await articlesService.getAllArticles()
  return res.json({
    message: 'get new feeds successfully',
    result
  })
}

export const createArticleController = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { content } = req.body
  const result = await articlesService.createArticle({
    user_id,
    content
  })
  return res.json({
    message: 'create article successfully',
    result
  })
}

export const getArticleByIdController = async (
  req: Request<ParamsDictionary, any, any, ArticlesParam>,
  res: Response
): Promise<any> => {
  const { article_id } = req.params
  const result = await articlesService.getArticleById(article_id)
  return res.json({
    message: 'get article by id successfully',
    result
  })
}

export const updateArticleController = async (
  req: Request<ParamsDictionary, any, any, ArticlesParam>,
  res: Response
): Promise<any> => {
  const { article_id } = req.params
  const { content } = req.body
  const result = await articlesService.updateArticle(article_id, content)
  return res.json({
    message: 'update article successfully',
    result
  })
}

export const deleteArticleController = async (
  req: Request<ParamsDictionary, any, any, ArticlesParam>,
  res: Response
): Promise<any> => {
  const { article_id } = req.params
  const result = await articlesService.deleteArticle(article_id)
  return res.json({ message: result.message, result })
};