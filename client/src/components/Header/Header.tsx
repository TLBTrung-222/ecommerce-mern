import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputSearch from "../InputSearch/InputSearch";
import Badge from "@mui/material/Badge";

function Header() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#2980b9",
                padding: "10px 120px",
                color: "white",
            }}
        >
            {/* Shop logo + name */}
            <Typography sx={{ fontWeight: "bold" }}>TRUNG'S SHOP</Typography>

            {/* Search field + Account */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <InputSearch size="small" label="Search..." />
                <PersonOutlineIcon fontSize="large" />
                <Box sx={{ fontSize: "small" }}>
                    <Box>Đăng nhập/Đăng kí</Box>
                    <Box>Tài khoản</Box>
                </Box>
            </Box>

            {/* Card */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Badge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </Badge>

                <Typography>Giỏ hàng</Typography>
            </Box>
        </Box>
    );
}

export default Header;
