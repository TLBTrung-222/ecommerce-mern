import { Box, Typography } from "@mui/material";
import React from "react";
import * as AdminService from "~/services/AdminService";
import { UserData } from "~/types";
import TableComponent from "../TableComponent/TableComponent";

// fetch all users, admin can CRUD user infor
function AdminUser() {
    const [users, setUsers] = React.useState<UserData[] | undefined>(undefined);

    React.useEffect(() => {
        const fetchData = async () => {
            const responseBody = await AdminService.getAllUsers();
            setUsers(responseBody.data?.users);
        };

        fetchData();
    }, []);

    return (
        <Box>
            <Typography variant="h6">Quản lí người dùng</Typography>
            {users && <TableComponent users={users} />}
        </Box>
    );
}

export default AdminUser;
