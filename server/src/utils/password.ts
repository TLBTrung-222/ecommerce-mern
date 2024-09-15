import bcrypt, { compare } from 'bcrypt'

const rounds = 12

// helper function to hash password (with salt) and compare password
export const hashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(rounds)
    const hash = await bcrypt.hash(password, salt)
    return {
        salt,
        hash
    }
}

/**
 * Compare a plain password with a hashed password
 * @notice no need to use salt, the hashed password already contains the salt
 * @param pw the plain password (normally get from user's submission)
 * @param hash the hashed password
 * @returns true | false
 */
export const comparePassword = async (pw: string, hash: string) => {
    return bcrypt.compare(pw, hash)
}
