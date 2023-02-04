const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const {getCategory,createCategory,updateCategory,deleteCategory} = require('../controllers/category')

router
    .get('/',verifyToken,getCategory)
    .post('/',verifyToken,createCategory)
    .put('/:id',verifyToken,updateCategory)
    .delete('/:id',verifyToken,deleteCategory)

module.exports = router