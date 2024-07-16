const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const { clientsRoute, loginRoute, productRoute, logoutRoute,
productsElectronics, womenClothingRoute, jeweleryRoute, mensClothingRoute, commentsRoute } = require('./routes') 

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());


app.use('/', clientsRoute);
app.use('/', loginRoute);
app.use('/', productRoute);
app.use('/', logoutRoute);
app.use('/', productsElectronics);
app.use('/', womenClothingRoute);
app.use('/', jeweleryRoute);
app.use('/', mensClothingRoute);
app.use('/', commentsRoute)

module.exports = app;