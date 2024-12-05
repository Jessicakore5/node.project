import client from './db.js'
export function createArticles() {
  client.query(
    `CREATE TABLE IF NOT EXISTS cikkek(
          cikkId INT GENERATED ALWAYS AS IDENTITY,
          cikkCim VARCHAR(250),
          cikkDatum TIMESTAMP,
          szerzoId  INT ,
          szoveg VARCHAR(1000),
          kategoriaid INT ,
          
          PRIMARY KEY (cikkId),
          
          CONSTRAINT fk_kategoriaid
          FOREIGN KEY (kategoriaid)
          REFERENCES kategoriak (id)
          
          )`
  )
}

export async function addArticles(cikkCim, szerzoId, szoveg) {
  await client.query(`
          INSERT INTO cikkek(cikkId,cikkCim,cikkDatum,szerzoId,szoveg)
          VALUES(DEFAULT,'${cikkCim}',NOW(),${szerzoId},'${szoveg}')`)
}

export async function getArticles() {
  const articles = await client.query(`SELECT  *  FROM cikkek`)
  return articles.rows
}

export async function updateArticles(
  cikkId,
  cikkCim,
  cikkDatum,
  szerzoId,
  szoveg
) {
  return await client.query(`
          UPDATE cikkek
          SET cikkCim= '${cikkCim}',cikkDatum=${cikkDatum},szerzoiId=${szerzoId},szoveg='${szoveg}'
          WHERE cikkId=${cikkId}`)
}

export async function deleteArticles(cikkId) {
  const categories = await client.query(`
            DELETE FROM cikkek
            WHERE cikkId=${cikkId}`)
  return categories.rows
}
