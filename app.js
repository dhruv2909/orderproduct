const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const order = require('./api/routes/order');
//const product = require('./api/routes/product');
const productRoutes = require('./api/routes/products');

const userRoutes = require('./api/routes/user');

mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads/', express.static('uploads'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://dhruv:U9KWOhXT0rpSWxTD@myapp-ihqpu.mongodb.net/login',
{useCreateIndex: true,
 useNewUrlParser: true }
);

app.use((req, res , next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (res.method === 'OPTIONS') {
        res.header('Access-Control-Allow-methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/order', order);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
//app.use('/product', product);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res , next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;