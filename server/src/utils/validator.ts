// helpers validatation func

import { SignUpForm } from '../types/UserRequest.type'

export const isEmpty = (value: string): boolean => !value.trim().length

/**
 * validate sign up form submitted by user
 * @param formData
 * @returns null if no error, otherwise a string represent the error
 */
export const validateSignUpData = (formData: SignUpForm) => {
    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) return 'All field is required'

    if (!validatePassword(password))
        return 'Password need to be at least 8 characters, including one letter and one number'

    if (!validateEmail(email)) return 'Not valid email'

    if (password !== confirmPassword) return 'Confirm password not match'

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
