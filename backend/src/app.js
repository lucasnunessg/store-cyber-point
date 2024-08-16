const express = require('express');
const cors = require('cors');


const { clientsRoute, loginRoute, productRoute, logoutRoute,
productsElectronics, womenClothingRoute, jeweleryRoute,freteRoute, mensClothingRoute, commentsRoute } = require('./routes') 

const app = express();

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
app.use('/', commentsRoute);
app.use('/', freteRoute);

module.exports = app;