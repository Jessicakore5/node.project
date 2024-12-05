import client from './db.js'
export function createUser() {
  client.query(
    `
      CREATE TABLE  IF NOT EXISTS felhasznalok (
              id INT GENERATED ALWAYS AS IDENTITY,
              nev VARCHAR(100) NOT NULL,
              email VARCHAR(100),
              jelszo VARCHAR(100),
              datum TIMESTAMP,
              PRIMARY KEY (id)
          )`
  )
}

export async function addUser(nev, email, jelszo) {
  await client.query(`
      INSERT INTO felhasznalok(id,nev,email,jelszo,datum)
      VALUES (default,'${nev}','${email}','${jelszo}',NOW())`)
}

export async function getUsers() {
  const users = await client.query(`SELECT * FROM felhasznalok`)
  return users.rows
}

export async function updateUser(nev, email, id) {
  const user = await client.query(` 
              UPDATE felhasznalok
              SET nev= '${nev}',email= '${email}'
              WHERE id=${id}
              `)
  return user.rows
}
export async function deleteUser(id) {
  const users = await client.query(`
      DELETE FROM felhasznalok
      WHERE id =${id}`)
  return users.rows
}
