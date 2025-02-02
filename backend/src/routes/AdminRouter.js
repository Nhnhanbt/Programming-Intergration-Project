const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/create_product', AdminController.createProduct);
router.get('/manage_product', AdminController.manageProduct);
router.get('/manage_user', AdminController.manageUser);
router.get('/manage_order', AdminController.manageOrder);
router.post('/update_order', AdminController.updateOrder);
router.post('/update_product', AdminController.updateProduct);
router.post('/update_payment', AdminController.updatePayment);
router.post('/remove_product', AdminController.removeProduct);
router.post('/ban_user', AdminController.banUser);
router.post('/add_notice', AdminController.add_notification);
router.get('/report', AdminController.report);
router.get('/report_order', AdminController.reportOrder);

module.exports = router