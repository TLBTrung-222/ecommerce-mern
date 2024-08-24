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
export const query = (text: string, params?: any[]) => {
    return pool.query(text, params)
}
