const {Router} = require('express');
const router = Router();
const {isAdmin} = require('../middleware/is-admin');
const adminController = require('../controllers/adminpanel'); 

router.post('/new_admin',isAdmin,adminController.create_admin);

router.get('/users',isAdmin,adminController.get_users); 

router.put('/user/edit/:id',isAdmin,adminController.edit_user);

router.get('/user/:id',isAdmin,adminController.get_user);

router.delete('/user/:id',isAdmin,adminController.delete_user);

module.exports = router;