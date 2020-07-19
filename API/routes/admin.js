const {Router} = require('express');
const router = Router();
const {isAdmin} = require('../middleware/is-admin');
const adminController = require('../controllers/adminpanel'); 

router.post('/new_admin',isAdmin,adminController.create_admin);

router.get('/users',isAdmin,adminController.get_users); 

module.exports = router;