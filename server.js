const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { configDotenv } = require('dotenv');
const cors = require('cors')

const productsRoute = require('./Routes/ProductsRoutes')
const userRouters = require('./Routes/UserRoutes')
const paymentRoutes = require('./Routes/PaymentRoutes')
const FavouriteRoutes = require('./Routes/FavouritesRoutes')
const ConnectDatabe = require('./Configueration/ConnectDatabase');
configDotenv();


app.use(cookieParser());
ConnectDatabe();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    res.send('Hello Programers ! This is my first individual project - XPLOR');
})

app.use('/user', userRouters)
app.use('/product', productsRoute)
app.use('/favourite', FavouriteRoutes)
app.use('/payment', paymentRoutes)
// app.use('/host', hostRoutes)

//error handling in middlewares
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server is running on PORT : ${PORT}`);
    console.log(`http://localhost:${PORT}`);

})
