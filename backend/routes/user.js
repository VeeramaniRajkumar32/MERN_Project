const router = require('express').Router();
const {
    register,
    login,
    users,
} = require('../controllers/user')

router.route('/').post(register);
router.route('/login').post(login);
router.route('/user').get(users);

module.exports = router