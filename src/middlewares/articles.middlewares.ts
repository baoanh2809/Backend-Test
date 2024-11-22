import { checkSchema } from 'express-validator'
import { validate } from '@/utils/validation'

export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num > 100 || num < 1) {
              throw new Error('Limit must be between 1 and 100')
            }
            return true
          }
        }
      },
      page: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 1) {
              throw new Error('Page >= 1')
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)