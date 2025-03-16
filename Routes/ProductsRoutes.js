const express = require('express');
const { getAllProducts, addProduct, deleteProduct, updateProduct, getProductById, addFavourites, getUserUploadedProducts } = require('../Controllers/ProductControllers');
const upload = require('../MIddleware/HandleImageUpload');
const checkLogin = require('../MIddleware/CheckLogin');
// const { body, validationResult } = require('express-validator');


const router = express.Router()

router.post('/add', upload.array('images', 5), addProduct);
router.get('/all', getAllProducts);

router.get('/get/:id', getProductById)
router.patch('/update/:id', checkLogin, upload.array('images', 5), updateProduct);
router.delete('/delete/:id', checkLogin, deleteProduct);

router.get('/user/:id', getUserUploadedProducts)

module.exports = router
