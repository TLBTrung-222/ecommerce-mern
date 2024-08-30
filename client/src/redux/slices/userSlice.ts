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
                isAdmin,
                city = ''
            }: UserActionPayload = action.payload
            // only update if the field have value
            state.id = id ? id : state.id
            state.name = name ? name : state.name
            state.email = email ? email : state.email
            state.address = address ? address : state.address
            state.phone = phone ? phone : state.phone
            state.avatar = avatar ? avatar : state.avatar
            state.access_token = access_token ? access_token : state.access_token
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin
            state.city = city ? city : state.city
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
