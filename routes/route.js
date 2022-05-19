const express = require('express');
const app = express();

const router = express.Router();
const {
	getOrders,
	getOrderDetails,
	updateOrderStatus
} = require('../controller/index');

router.get('/getorders/:status', getOrders);
router.get('/getorderdetails/:project_name', getOrderDetails);

router.post('/updateorderstatus/:project_name/:status', updateOrderStatus);

module.exports = router;
