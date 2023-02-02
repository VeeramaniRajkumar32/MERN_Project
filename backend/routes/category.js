const router = require('express').Router();
const {getCategory,createCategory,updateCategory,deleteCategory} = require('../controllers/category')

router.route('/').get(getCategory).post(createCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router