import Chip from '@mui/material/Chip'
import SliderComponent from '~/components/Slider/Slider'
import slider1 from '~/assets/slider1.png'
import slider2 from '~/assets/slider2.png'
import slider3 from '~/assets/slider3.png'
import slider4 from '~/assets/slider4.png'
import CardComponent from '~/components/CardComponent/CardComponent'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as ProductService from '~/services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { ProductData } from '~/types'
import { CircularProgress } from '@mui/material'

function HomePage() {
    const {
        data: productResponseBody,
        error: errorProduct,
        isLoading: isLoadingProduct
    } = useQuery({
        queryKey: ['products'],
        queryFn: ProductService.fetchAllProduct,
        retry: 3
    })

    const {
        data: typesResponseBody,
        error: errorTypes,
        isLoading: isLoadingTypes
    } = useQuery({
        queryKey: ['types'],
        queryFn: ProductService.fetchAllTypes
    })

    if (isLoadingProduct || isLoadingTypes) return <CircularProgress />
    if (errorProduct || errorTypes) return <div>Error fetching products</div>

    return (
        <Box sx={{}}>
            {/* Category */}
            <Box
                sx={{
                    height: '50px',
                    p: '30px',
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ecf0f1'
                }}
            >
                {typesResponseBody?.data.productTypes.map((value: { type: string }) => (
                    <Chip key={value.type} label={value.type} variant="outlined" />
                ))}
            </Box>

            {/* Slider + card list */}
            <Container sx={{ height: '1000px' }}>
                {/* Slider */}
                <Box sx={{ mb: '60px' }}>
                    <SliderComponent images={[slider1, slider2, slider3, slider4]} />
                </Box>

                {/* Card list */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)', // 1 column on small screens
                            sm: 'repeat(2, 1fr)', // 2 columns on small to medium screens
                            md: 'repeat(3, 1fr)', // 3 columns on medium to large screens
                            lg: 'repeat(4, 1fr)' // 4 columns on large screens
                        },
                        gap: 2,
                        pb: '20px'
                    }}
                >
                    {productResponseBody?.data.products.map((product: ProductData) => (
                        <CardComponent key={product.id} product={product} />
                    ))}
                </Box>

                {/* More button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button variant="contained">Xem thêm</Button>
                </Box>
            </Container>
        </Box>
    )
}

export default HomePage
