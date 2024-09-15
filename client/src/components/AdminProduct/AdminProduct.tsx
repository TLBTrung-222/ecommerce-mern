import { Box, Typography } from "@mui/material";
import React from "react";
import { ProductData } from "~/types";
import * as ProductService from "~/services/ProductService";
import TableComponent from "../TableComponent/TableComponent";
import { GridColDef } from "@mui/x-data-grid";

// fetch all products
function AdminProduct() {
    const [products, setProducts] = React.useState<ProductData[] | null>(null);

    React.useEffect(() => {
        async function fetchProducts() {
            const responseBody = await ProductService.fetchAllProduct();
            setProducts(responseBody.data.products);
        }
        fetchProducts();
    }, []);

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 150, type: "string" },
        { field: "price", headerName: "Price", width: 150, type: "string" },
        { field: "rating", headerName: "Rating", width: 150, type: "number" },
        { field: "type", headerName: "Type", width: 150, type: "number" },
    ];

    return (
        <Box>
            <Typography variant="h6">Quản lí sản phẩm</Typography>

            {/* TODO: add product button */}
            {products && (
                <TableComponent
                    data={products}
                    columns={columns}
                    getRowId={(row) => row.id}
                />
            )}
        </Box>
    );
}

export default AdminProduct;
