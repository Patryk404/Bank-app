const express = require('express');
const router = express.Router();
const {isAuth} = require('../middleware/is-auth');
const UserpanelController = require('../controllers/userpanel');

router.post('/transfer',isAuth,UserpanelController.make_transfer);

module.exports = router;