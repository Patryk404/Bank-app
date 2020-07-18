const {Router} = require('express');
const router = Router();
const adminController = require('../controllers/adminpanel'); 

router.post('/new_admin',adminController.create_admin);

router.get('/users',adminController.get_users); 

module.exports = router;