// helpers validatation func

import { SignInForm, SignUpForm, UpdateForm } from '../types/users'

export const isEmpty = (value: string): boolean => !value.trim().length

/**
 * validate sign up form submitted by user
 * @param formData
 * @returns null if no error, otherwise a string represent the error
 */
export const validateSignUpData = (formData: SignUpForm) => {
    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword)
        return 'All field (name, email, password, confirmPassword) is required'

    // if (containEmptyField(formData)) return 'Contains empty field'

    if (!validatePassword(password))
        return 'Password need to be at least 8 characters, including one letter and one number'

    if (!validateEmail(email)) return 'Not valid email'

    if (password !== confirmPassword) return 'Confirm password not match'

    return null
}

/**
 * validate sign in form submitted by user
 * @param formData
 * @returns null if no error, otherwist a string represent the error
 */
export const validateSignInData = (formData: SignInForm) => {
    const { email, password } = formData

    if (containEmptyField(formData)) return 'Contains empty field'

    if (!validatePassword(password))
        return 'Password need to be at least 8 characters, including one letter and one number'

    if (!validateEmail(email)) return 'Not valid email'

    return null
}

export const validateUpdateData = (formData: UpdateForm) => {
    const { name, password, address, avatar, city, phone } = formData

    if (!name && !password && !address && !avatar && !city && !phone) return 'At least 1 not-empty field is required'

    if (containEmptyField(formData)) return 'Contains empty field'

    if (password && !validatePassword(password))
        return 'New password need to be at least 8 characters, including one letter and one number'

    return null
}

// --------------  helper for 'helper' functions (not export) ---------------------------------------------- -------
const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
}

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const validatePassword = (password: string): boolean => {
    // At least 8 characters, including one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
}

const containEmptyField = (obj: { [key: string]: any }): boolean => {
    for (const key in obj) {
        if (
            ['name', 'phone', 'address', 'city', 'avatar', 'password'].includes(key) &&
            (obj[key] === null || obj[key] === undefined || obj[key] === '')
        ) {
            return true
        }
    }
    return false
}
