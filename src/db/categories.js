import client from './db.js'
export function createCategory() {
  client.query(
    `CREATE TABLE IF NOT EXISTS kategoriak(
      id INT GENERATED ALWAYS AS IDENTITY,
      kategoriaNev VARCHAR(200),
        PRIMARY KEY (id))`
  )
}
export function addCategory(kategoriaNev) {
  client.query(`INSERT INTO kategoriak
      VALUES(DEFAULT,'${kategoriaNev}')
      `)
}
export async function getCategory() {
  const categories = await client.query(`SELECT * FROM kategoriak`)
  return categories.rows
}
export async function updateCategory(kategoriaNev, id) {
  const categories = await client.query(`
      UPDATE kategoriak
      SET kategoriaNev='${kategoriaNev}'
      WHERE id= ${id}`)
  return categories.rows
}

export async function deleteCategory(id) {
  const categories = await client.query(`
      DELETE FROM kategoriak
      WHERE id=${id}`)
  return categories.rows
}
