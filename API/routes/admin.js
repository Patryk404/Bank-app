const {Router} = require('express');
const router = Router();
const adminController = require('../controllers/adminpanel'); 

router.post('/new_admin',adminController.create_admin);

module.exports = router;