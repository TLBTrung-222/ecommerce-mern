import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import SliderComponent from "~/components/Slider/Slider";
import slider1 from "~/assets/slider1.png";
import slider2 from "~/assets/slider2.png";
import slider3 from "~/assets/slider3.png";
import slider4 from "~/assets/slider4.png";
import CardComponent from "~/components/CardComponent/CardComponent";
import { Container } from "@mui/material";

function HomePage() {
    const items = ["TV", "Tu lanh", "Laptop", "TV", "Tu lanh", "Laptop"];
    const handleClick = () => {
        console.info("You clicked the Chip.");
    };
    return (
        <Box sx={{ m: "10px 30px" }}>
            {/* Category */}
            <Box
                sx={{
                    height: "50px",
                    mb: "10px",
                    gap: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </Box>
            </Container>
        </Box>
    );
}

export default HomePage;
