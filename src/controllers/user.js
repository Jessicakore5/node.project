import { getUsers, addUser, updateUser, deleteUser } from '../db/user.js'

import Joi from 'joi'
import bcrypt from 'bcrypt'

const addRule = Joi.object({
  email: Joi.string().required().min(10).max(30),
  nev: Joi.string().required().min(3).max(10),
  jelszo: Joi.string().required().min(8),
  jelszoMegerosit: Joi.string().required().min(8)
})

const updateRule = Joi.object({
  nev: Joi.string().required().min(3).max(10),
  email: Joi.string().required().min(10).max(30)
})
async function GetUsers(req, res) {
  res.send(await getUsers())
}

async function AddUser(req, res) {
  try {
    const { email, nev, jelszo, jelszoMegerosit } = await addRule.validateAsync(
      req.body
    )
    const titkosJelszo = await bcrypt.hash(jelszo, 10)
    const ugyanaz = await bcrypt.compare(jelszoMegerosit, titkosJelszo)
    if (!ugyanaz) {
      res.status(400).send('nem ugyanaz a jelszo')
      return
    }
    await addUser(nev, email, titkosJelszo)
    res.send('Felhasznalo hozzaadva')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateUser(req, res) {
  try {
    const { nev, email } = await updateRule.validateAsync(req.body) //email,nev
    const { id } = req.params
    await updateUser(nev, email, id)
    res.send('Felhasznalok frissitve')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteUser(req, res) {
  const { id } = req.params
  res.send(await deleteUser(id))
}

export const userController = {
  GetUsers,
  AddUser,
  UpdateUser,
  DeleteUser
}
