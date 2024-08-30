import Chip from "@mui/material/Chip";
import SliderComponent from "~/components/Slider/Slider";
import slider1 from "~/assets/slider1.png";
import slider2 from "~/assets/slider2.png";
import slider3 from "~/assets/slider3.png";
import slider4 from "~/assets/slider4.png";
import CardComponent from "~/components/CardComponent/CardComponent";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function HomePage() {
    const items = ["TV", "Tu lanh", "Laptop"];
    const handleClick = () => {
        console.info("You clicked the Chip.");
    };
    return (
        <Box sx={{}}>
            {/* Category */}
            <Box
                sx={{
                    height: "50px",
                    p: "30px",
                    gap: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ecf0f1",
                }}
            >
                {items.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        variant="outlined"
                        onClick={handleClick}
                    />
                ))}
            </Box>

            {/* Slider + card list */}
            <Container sx={{ height: "1000px" }}>
                {/* Slider */}
                <Box sx={{ mb: "60px" }}>
                    <SliderComponent
                        images={[slider1, slider2, slider3, slider4]}
                    />
                </Box>

                {/* Card list */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(1, 1fr)", // 1 column on small screens
                            sm: "repeat(2, 1fr)", // 2 columns on small to medium screens
                            md: "repeat(3, 1fr)", // 3 columns on medium to large screens
                            lg: "repeat(4, 1fr)", // 4 columns on large screens
                        },
                        gap: 2,
                        pb: "20px",
                    }}
                >
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    {/* Add more CardComponent instances as needed */}
                </Box>

                {/* More button */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button variant="contained">Xem thêm</Button>
                </Box>
            </Container>
        </Box>
    );
}

export default HomePage;
