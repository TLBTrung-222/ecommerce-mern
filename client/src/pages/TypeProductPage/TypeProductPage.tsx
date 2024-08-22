import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CardComponent from "~/components/CardComponent/CardComponent";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function TypeProductPage() {
    const items = ["TV", "Tu lanh", "Laptop"];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={2} sx={{ flexGrow: 1, p: "10px 20px" }}>
                {/* Type list as nav bar */}
                <Grid gap={1} item xs={3}>
                    {items.map((item) => (
                        <Item key={item}>{item}</Item>
                    ))}
                </Grid>

                {/* Product of this type */}
                <Grid
                    container
                    gap={2}
                    item
                    xs={8}
                    sx={{
                        alignContent: "flex-start", // Align items at the start of the container
                    }}
                >
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </Grid>
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <Pagination count={10} color="primary" size="large" />
            </Box>
        </Box>
    );
}

export default TypeProductPage;
