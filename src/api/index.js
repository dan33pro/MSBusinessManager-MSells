const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const config = require('../../config');

const route = require('./components/route/network.js');
const client = require('./components/client/network.js');
const order = require('./components/order/network.js');
const order_detail = require('./components/order_detail/network.js');
const product = require('./components/product/network.js');
const product_type = require('./components/product_type/network.js');

const errors = require('../tools/network/errors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROUTER
const swaggerDoc = require('./swagger.json');

app.use('/api/route', route);
app.use('/api/client', client);
app.use('/api/order', order);
app.use('/api/order_detail', order_detail);
app.use('/api/product', product);
app.use('/api/product_type', product_type);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Debe ser el ultimo
app.use(errors);

app.listen(config.myBusinessManagerService.port, () => {
    console.log('Api escuchando en el puerto ', config.myBusinessManagerService.port);
});