import React from "react";
import { Box, Typography } from "@mui/material";
import * as AdminService from "~/services/AdminService";
import { UserData } from "~/types";
import TableComponent from "../TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import UpdateDialog from "./Dialog/UpdateDialog";
import DeleteDialog from "./Dialog/DeleteDialog";

function AdminUser() {
    const [users, setUsers] = React.useState<UserData[] | undefined>(undefined);

    React.useEffect(() => {
        const fetchData = async () => {
            const responseBody = await AdminService.getAllUsers();
            setUsers(responseBody.data?.users);
        };

        fetchData();
    }, []);

    const columns: GridColDef[] = [
        { field: "name", headerName: "User Name", width: 150, type: "string" },
        { field: "email", headerName: "Email", width: 250, type: "string" },
        { field: "address", headerName: "Address", width: 120, type: "string" },
        { field: "is_admin", headerName: "Admin", type: "boolean", width: 120 },
        {
            field: "phone",
            headerName: "Phone",
            sortable: false,
            width: 160,
            type: "string",
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 120,
            type: "date",
            valueGetter: (value: string) => new Date(value), // value is time in ISO 8601 format
        },
        {
            field: "actions",
            type: "actions",
            width: 120,
            getActions: (params) => [
                <UpdateDialog user={params.row} />,
                <DeleteDialog user={params.row} />,
            ],
        },
    ];

    return (
        <Box>
            <Typography variant="h6">Quản lí người dùng</Typography>
            {users && (
                <TableComponent
                    data={users}
                    columns={columns}
                    getRowId={(row: UserData) => row.id}
                />
            )}
        </Box>
    );
}

export default AdminUser;
