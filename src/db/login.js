import client from './db'
export function createLogin() {
  client.query(`
        CREATE TABLE IF NOT EXISTS bejelentkezes(
        id INT GENERATED ALWAYS AS IDENTITY,
        jelszo VARCHAR(100),
        PRIMARY KEY(id)
)`)
}

export async function loginUser() {
  const users = await client.query(`SELECT * FROM felhasznalok`)
  return users.rows
}
