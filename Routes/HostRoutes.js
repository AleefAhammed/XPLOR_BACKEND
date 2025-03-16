const express = require('express');
const { createHost, hostLogin, getAllHost, getHostById, deleteHostAccount, updateHost } = require('../Controllers/HostControllers');

const router = express.Router();


router.post('/signup',createHost)
router.post('/login',hostLogin)
router.get('/all',getAllHost)
router.get("/get/:id",getHostById)
router.delete('/deleteAccount/:id',deleteHostAccount)
router.patch("/updateAccount/:id",updateHost)

module.exports = router