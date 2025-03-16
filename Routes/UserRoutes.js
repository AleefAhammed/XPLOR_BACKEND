const express = require('express');
const { createUser, getAllUSer, getUserById, deleteUserAccount, updateUser, userLogin, userVerification } = require('../Controllers/AuthControllers');
const checkLogin = require('../MIddleware/CheckLogin');
const upload = require('../MIddleware/HandleImageUpload');

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', userLogin)
router.get('/getAll', getAllUSer)
router.get('/get/:id', getUserById)
router.patch('/update', upload.single("image"), updateUser)
router.delete('/deleteAccount/:id', deleteUserAccount)

router.get('/verify', checkLogin, userVerification)

module.exports = router