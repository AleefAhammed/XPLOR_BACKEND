const express = require('express');
const { addFavourites, deleteFavourite, getAllFavourites, getFavouritesOfUser } = require('../Controllers/FavouriteControllers');
const checkLogin = require('../MIddleware/CheckLogin');

const router = express.Router()

router.post('/add', addFavourites);
router.delete('/remove/:id', checkLogin, deleteFavourite)
router.get('/all', getAllFavourites)
router.get('/userId/:id', getFavouritesOfUser)

module.exports = router