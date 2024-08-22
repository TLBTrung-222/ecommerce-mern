import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

function ProductDetailPage() {
    const product = {
        title: "Product Name",
        imageUrl: "https://via.placeholder.com/200",
        rating: 4,
        sold: 1000,
        price: "10,000,000 VND",
        address: "123 Example Street, City, Country",
    };

    return (
        <Grid container spacing={4} sx={{ p: "20px 100px" }}>
            {/* Left: Product Image */}
            <Grid item xs={8} md={4}>
                <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.title}
                    sx={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />
            </Grid>

            {/* Right: Product Details */}
            <Grid item xs={12} md={6}>
                <Box>
                    {/* Title */}
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.title}
                    </Typography>

                    {/* Rating and Sold Info */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Rating value={product.rating} readOnly />
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            ({product.sold} sold)
                        </Typography>
                    </Box>

                    {/* Price */}
                    <Typography variant="h5" color="red" sx={{ mb: 2 }}>
                        {product.price}
                    </Typography>

                    {/* Address */}
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Giao đến: {product.address}
                    </Typography>

                    {/* Quantity Selector */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            Số lượng:
                        </Typography>
                        <TextField
                            type="number"
                            defaultValue={1}
                            inputProps={{ min: 1 }}
                            sx={{ width: "60px" }}
                        />
                    </Box>

                    {/* Buy Button */}
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: "red" }}
                    >
                        Chọn mua
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ProductDetailPage;
