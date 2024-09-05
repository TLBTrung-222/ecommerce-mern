import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { UserData } from "~/types";

const columns: GridColDef[] = [
    { field: "name", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "address", headerName: "Address", width: 130 },
    {
        field: "is_admin",
        headerName: "Admin",
        type: "boolean",
        width: 90,
    },
    {
        field: "phone",
        headerName: "Phone",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
    },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TableComponent({ users }: { users: UserData[] }) {
    console.log(users);
    return (
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
