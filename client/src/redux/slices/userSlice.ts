import { createSlice } from '@reduxjs/toolkit'
import { UserActionPayload } from '~/types'

const userInitialState = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    access_token: '',
    id: 0,
    isAdmin: false,
    address: '',
    city: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        updateUser: (state, action) => {
            // create default value for user
            const {
                id,
                name = '',
                email = '',
                access_token = '',
                address = '',
                phone = '',
                avatar = '',
                is_admin,
                city = ''
            }: UserActionPayload = action.payload
            // only update if the field have value
            state.id = id ?? state.id
            state.name = name || state.name
            state.email = email || state.email
            state.address = address || state.address
            state.phone = phone || state.phone
            state.avatar = avatar || state.avatar
            state.access_token = access_token || state.access_token
            state.isAdmin = is_admin ?? state.isAdmin
            state.city = city || state.city
        },
        clearUser: (state) => {
            state.name = ''
            state.email = ''
            state.address = ''
            state.phone = ''
            state.avatar = ''
            state.id = 0
            state.access_token = ''
            state.isAdmin = false
            state.city = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateUser, clearUser } = userSlice.actions

export default userSlice.reducer
