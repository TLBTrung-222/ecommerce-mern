import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface TableComponentProps<T> {
    data: T[];
    columns: GridColDef[];
    getRowId: (row: T) => string | number;
}

function TableComponent<T>({
    data,
    columns,
    getRowId,
}: TableComponentProps<T>) {
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
                columns={columns}
                rows={data}
                getRowId={getRowId}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </Paper>
    );
}

export default TableComponent;
