import { loginUser } from '../db/login.js'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const loginRule = Joi.object({
  id: Joi.number().required(),
  jelszo: Joi.string().required().min(8)
})

async function LoginUser(req, res) {
  try {
    const { jelszo } = await loginRule.validateAsync(req.body)
    const id = await bcrypt.hash(jelszo, 10)

    const ugyanaz = await bcrypt.compare(jelszo, id)
    if (!ugyanaz) {
      res.status(400).send('Sikertelen')
      return
    }
    await loginUser(jelszo)
    res.send('Sikeres')
  } catch (error) {
    res.status(400).send(error)
  }
}
export const userController = {
  LoginUser
}
