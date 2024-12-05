import express from 'express'
import { createUser } from './db/user.js'
import { createArticles } from './db/articles.js'
import { createCategory } from './db/categories.js'
import { createComments } from './db/comments.js'
import { createLogin } from './db/login.js'

import morgan from 'morgan'
import bodyParser from 'body-parser'
import { userRouter } from './routes/users.js'
import { categoryRouter } from './routes/category.js'
import { articleRouter } from './routes/article.js'
import { commentsRouter } from './routes/comments.js'
import { authRouter } from './routes/auth.js'

import cors from 'cors'
const server = express()
const port = 3001

server.use(cors())
server.use(bodyParser.json())

server.use(morgan('dev'))

server.use('/login', authRouter)

server.use('/comments', commentsRouter)

server.use('/users', userRouter)

server.use('/categories', categoryRouter)

server.use('/articles', articleRouter)

server.get('/orszag', (req, res) => {
  res.send('orszag world ez az elso projektem')
})

server.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port}cimen`)
  createUser()
  createCategory()
  createComments()
  createArticles()
  createLogin()
})
