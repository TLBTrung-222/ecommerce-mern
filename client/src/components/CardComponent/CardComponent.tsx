import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { Box } from '@mui/material'
import { ProductData } from '~/types'

interface CardComponentProps {
    product: ProductData
}

function CardComponent({ product }: CardComponentProps) {
    return (
        <Card sx={{ maxWidth: '250px' }}>
            <CardMedia
                sx={{
                    height: 250,
                    width: 250,
                    objectFit: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto'
                }}
                image="https://cdn.pixabay.com/photo/2016/10/10/14/46/icon-1728549_1280.jpg"
                title="green iguana"
            />
            {/* Rating + selled */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mr: '40px',
                    color: '#95a5a6'
                }}
            >
                <Rating name="simple-controlled" value={parseInt(product.rating)} sx={{ p: '5px 10px' }} />
                <Typography variant="body2">Đã bán {product.selled}</Typography>
            </Box>
            <CardContent
                sx={{
                    p: '10px'
                }}
            >
                {/* Name */}
                <Typography variant="body1" color="text.secondary" marginBottom="5px" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" marginBottom="5px">
                    Còn lại {product.count_in_stock} sản phẩm
                </Typography>

                {/* Price + discount */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mr: '20px'
                    }}
                >
                    <Typography variant="h6" color="red">
                        {product.price} VND
                    </Typography>
                    <Typography color="red">-{product.discount}%</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CardComponent
