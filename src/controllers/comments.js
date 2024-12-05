import {
  getComments,
  addComments,
  updateComments,
  deleteComments
} from '../db/comments.js'

async function GetComments(req, res) {
  res.send(await getComments())
}

async function AddComments(req, res) {
  const { id, cikkId } = req.params
  const { szoveg } = await req.body
  await addComments(id, cikkId, szoveg)
  res.send('hozzaszolas hozzaadva')
}

async function UpdateComments(req, res) {
  const { hozzaszolasId, id, cikkId } = req.params
  const { szoveg } = req.body
  await updateComments(hozzaszolasId, id, cikkId, szoveg)
  res.send('Hozzaszolas frissitve')
}

async function DeleteComments(req, res) {
  const { hozzaszolasId } = req.params
  res.send(await deleteComments(hozzaszolasId))
}

export const commentsController = {
  GetComments,
  AddComments,
  UpdateComments,
  DeleteComments
}
