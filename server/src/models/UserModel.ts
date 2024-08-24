import * as db from '../db'
import { UserWithHashedPassword } from '../types/User.type'

class User {
    /**
     * Adds new user to the database
     *
     * @param data user with hashed password + salt
     * @return The new user or null
     */
    async create(data: UserWithHashedPassword): Promise<Object | null> {
        try {
            const { name, email, pw_hash, pw_salt } = data

            const sql = `INSERT INTO users (name, email, pw_hash, pw_salt) 
                                VALUES ($1, $2, $3, $4) 
                                RETURNING *` // returning works same way as select
            const values = [name, email, pw_hash, pw_salt]

            const result = await db.query(sql, values)
            if (result.rows.length == 0) return null
            return result.rows[0]
        } catch (error) {
            throw new Error(`${(error as Error).message}`)
        }
    }

    async findByEmail(email: string) {
        try {
            const sql = `SELECT * FROM users WHERE email=$1`
            const values = [email]
            const result = await db.query(sql, values)

            if (result.rows.length == 0) return null
            return result.rows[0]
        } catch (error) {
            throw new Error(`Error from Model: ${(error as Error).message}`)
        }
    }
}

export default new User()
