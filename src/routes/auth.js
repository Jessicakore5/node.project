import { Router } from 'express'
import { loginController } from '../controllers/auth.js'

export const authRouter = Router()

authRouter.post('/login', loginController.LoginUser)
