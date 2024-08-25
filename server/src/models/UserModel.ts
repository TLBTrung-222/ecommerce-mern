import * as db from '../db'
import { UserData, UserUpdateBody, UserWithHashedPassword } from '../types/User.type'

class User {
    /**
     * Adds new user to the database
     *
     * @param data user with hashed password + salt
     * @return The new user or null
     */
    async create(data: UserWithHashedPassword): Promise<UserData | null> {
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

    async update(data: UserData): Promise<UserData | null> {
        try {
            const sql = `UPDATE users 
                        SET name=$2, 
                            pw_hash=$3, 
                            pw_salt=$4, 
                            is_admin=$5, 
                            phone=$6, 
                            address=$7, 
                            avatar=$8, 
                            city=$9 
                        WHERE id=$1
                        RETURNING *`
            const values = [
                data.id,
                data.name,
                data.pw_hash,
                data.pw_salt,
                data.is_admin,
                data.phone,
                data.address,
                data.avatar,
                data.city
            ]

            const result = await db.query(sql, values)
            if (result.rows.length == 0) return null
            return result.rows[0]
        } catch (error) {
            throw new Error(`${(error as Error).message}`)
        }
    }

    async findById(id: string): Promise<UserData | null> {
        try {
            const sql = `SELECT * FROM users WHERE id=$1` // no need RETURNING *
            const values = [id]
            const result = await db.query(sql, values)
            if (result.rows.length == 0) return null
            return result.rows[0]
        } catch (error) {
            throw new Error(`${(error as Error).message}`)
        }
    }

    async findByEmail(email: string): Promise<UserData | null> {
        try {
            const sql = `SELECT * FROM users WHERE email=$1` // no need RETURNING *
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
