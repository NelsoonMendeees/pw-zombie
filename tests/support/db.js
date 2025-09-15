import { Pool } from 'pg'

const dbConfig = {
  user: 'dba',
  host: 'localhost',
  database: 'zombie',
  password: 'dba',
  port: 5432
}

export async function executeQuery(query) {
  try {
    const pool = new Pool(dbConfig)
    const client = await pool.connect()

    const result = await client.query(query)
    console.log('Query executada:', result.rows)
  } catch (error) {
    console.error('Erro ao executar a query:', error)
  }
}
