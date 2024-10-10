import pkg  from 'pg'
import dotenv from 'dotenv'

// https://node-postgres.com/apis/pool
// https://node-postgres.com/features/transactions

const environment = process.env.NODE_ENV
dotenv.config()

const { Pool } = pkg

const openDb = () => {
  const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: environment === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })
  return pool
} 

const pool = openDb()

export { pool }

