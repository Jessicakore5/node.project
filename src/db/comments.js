import client from './db.js'

export function createComments() {
  client.query(` CREATE TABLE IF NOT EXISTS hozzaszolasok(
  hozzaszolasId INT GENERATED ALWAYS AS IDENTITY,
  id INT,
  cikkId INT,
  datum TIMESTAMP,
  szoveg VARCHAR(1000),

  PRIMARY KEY (hozzaszolasId),

   CONSTRAINT fk_id
       FOREIGN KEY (id)
       REFERENCES felhasznalok (id)
  )
      `)
}

export async function addComments(id, cikkId, szoveg) {
  await client.query(`
      INSERT INTO hozzaszolasok(hozzaszolasId,id,cikkId,datum,szoveg)
  VALUES (DEFAULT,$${id},${cikkId},NOW(),'${szoveg}')
        `)
}
export async function getComments() {
  const comments = await client.query(`SELECT * FROM hozzaszolasok`)
  return comments.rows
}

export async function updateComments(hozzaszolasId, id, cikkId, szoveg) {
  return await client.query(`
      UPDATE hozzaszolasok
      SET id=${id},cikkId=${cikkId},szoveg='${szoveg}'
      WHERE hozzaszolasId=${hozzaszolasId}`)
}

export async function deleteComments(hozzaszolasId) {
  const comments = await client.query(`
      DELETE FROM hozzaszolasok
      WHERE hozzaszolasId=${hozzaszolasId}`)
  return comments.rows
}
