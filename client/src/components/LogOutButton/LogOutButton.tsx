import { useDispatch } from 'react-redux'
import * as UserService from '~/services/UserService'
import { clearUser } from '~/redux/slices/userSlice' // Assume you have this action
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'

const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await UserService.logOutUser()
            dispatch(clearUser()) // Clear user data from Redux store
        } catch (error) {
            console.error('Logout failed:', error)
            // Handle error (show a notification to the user, etc.)
        }
    }
    return (
        <IconButton onClick={handleLogout} aria-label="logout">
            <LogoutIcon sx={{ color: '#ecf0f1' }} />
        </IconButton>
    )
}

export default LogoutButton
