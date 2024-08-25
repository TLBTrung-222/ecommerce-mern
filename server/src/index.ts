import app from './app'
import { env } from './config/environment'

const PORT = env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Express server started at port ${process.env.PORT}`)
})
