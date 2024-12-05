import { Router } from 'express'
import { userController } from '../controllers/user.js'

export const userRouter = Router()

userRouter.get('/', userController.GetUsers)

userRouter.post('/', userController.AddUser)

userRouter.put('/:id', userController.UpdateUser)

userRouter.delete('/:id', userController.DeleteUser)
