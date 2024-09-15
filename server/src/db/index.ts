import { Pool } from 'pg'
import { env } from '../config/environment'

const pool = new Pool({
    user: env.PGUSER,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    port: env.PGPORT ? parseInt(env.PGPORT, 10) : undefined,
    database: env.PGDATABASE
})
// postgres://postgres:baotrung285@localhost:5432/pern-ecommerce

// in other module, we import * as db from '../db' to use db.query()
export const query = async (text: string, params?: any[]) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}
