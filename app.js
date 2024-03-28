require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const errorhandlerMiddleware = require('./middleware/error-handler');
const notfoundMiddleware = require('./middleware/not-found');
const connectDB = require('./db/connect');
const productsRoute = require('./routes/products');

//middleware
app.use(express.json())

//routes
app.use('/api/v1/products', productsRoute)

//middleware
app.use(errorhandlerMiddleware);
app.use(notfoundMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening to the ${port}....`))
    } catch (e) {
        console.log(e)
    }
}

start();