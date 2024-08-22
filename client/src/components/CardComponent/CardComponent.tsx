import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import React from "react";
import { Box } from "@mui/material";

function CardComponent() {
    const [value, setValue] = React.useState<number | null>(2);

    return (
        <Card sx={{ maxWidth: "250px" }}>
            <CardMedia
                sx={{
                    height: 250,
                    width: 250,
                    objectFit: "cover",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                }}
                image="https://cdn.pixabay.com/photo/2016/10/10/14/46/icon-1728549_1280.jpg"
                title="green iguana"
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mr: "40px",
                    color: "#95a5a6",
                }}
            >
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{ p: "5px 10px" }}
                />
                <Typography variant="body2">Da ban 1000+</Typography>
            </Box>
            <CardContent
                sx={{
                    p: "10px",
                }}
            >
                <Typography
                    variant="body1"
                    color="text.secondary"
                    marginBottom="5px"
                >
                    Card màn hình Colorful RTX 3080TI Advanced OC-V 12G
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mr: "100px",
                    }}
                >
                    <Typography color="red">10.000.000 VND</Typography>
                    <Typography variant="h6" color="red">
                        -5%
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CardComponent;
