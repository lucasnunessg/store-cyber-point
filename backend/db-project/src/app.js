const express = require('express');
const cors = require('cors');


const { clientsRoute, loginRoute, productRoute, logoutRoute,
productsElectronics, womenClothingRoute, jeweleryRoute } = require('./routes') 

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

module.exports = app;