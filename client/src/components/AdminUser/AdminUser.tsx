import { Box } from '@mui/material'
import React from 'react'
import * as AdminService from '~/services/AdminService'
import { UserData } from '~/types'

// fetch all users, admin can CRUD user infor
function AdminUser() {
    const [users, setUsers] = React.useState<UserData[] | undefined>(undefined)

    React.useEffect(() => {
        const fetchData = async () => {
            const responseBody = await AdminService.getAllUsers()
            setUsers(responseBody.data?.users)
        }

        fetchData()
    }, [])

    return <Box>{users?.map((user) => user.id)}</Box>
}

export default AdminUser
