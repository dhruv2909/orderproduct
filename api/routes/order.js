const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

//import order controllers
const OrdersController = require('../controllers/order');

//Handle incoming GET request to /orders
router.get('/',checkAuth, OrdersController.order_get_all);

router.post('/',checkAuth, OrdersController.order_create_order);
router.get('/:orderId', checkAuth, OrdersController.order_get_order);

router.delete('/:orderId',checkAuth, OrdersController.order_delete_order);
module.exports = router;