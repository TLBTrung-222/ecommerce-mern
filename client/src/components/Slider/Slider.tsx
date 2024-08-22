import Box from "@mui/material/Box";
import Slider from "react-slick";
import "./Slider.css";

interface SliderProps {
    images: Array<string>;
}

export default function SliderComponent({ images }: SliderProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,

        autoplaySpeed: 1000,
    };
    return (
        <Box sx={{ backgroundColor: "#ecf0f1" }}>
            <Slider {...settings}>
                {images.map((image) => (
                    <Box
                        key={image}
                        component="img"
                        src={image}
                        sx={{
                            height: "330px",
                            width: "100%",
                            // maxWidth: { xs: 350, md: 1000 },
                        }}
                        alt="image slider"
                    />
                ))}
            </Slider>
        </Box>
    );
}
