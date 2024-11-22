/** @format */

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
*        responses:
 *          '200':
 *            description: Delete Articles successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                    type: string
 *                      example: 'Delete Articles successfully'
 *          '403':
 *            description: Forbidden - Only Admins can delete articles
 *            content:
 *              application/json:
 *              schema:
 *                type: object
 *                properties:
 *              message:
 *                type: string
 *                example: "User not authorized"
 *      patch:
 *        tags:
 *          - Articles
 *        summary: Update Article
 *        description: Update Article
 *        security:
 *          - BearerAuth: []
 *        parameters:
 *          - in: path
 *            name: article_id
 *            required: true
 *            description: ID of the article that needs to be updated
 *        schema:
 *          type: object
 *          properties:
 *            article_id:
 *              type: string
 *              format: MongoID
 *              example: '65fada2481786c414cb45039'
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  content:
 *                    type: string
 *                    example: 'This is a Articles'
 *        responses:
 *          '200':
 *            description: Update Articles successfully
 *            content:
 *              application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: 'Update Articles successfully'