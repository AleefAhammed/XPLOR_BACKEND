const Favourite = require("../Model/FavouritesModel");
const Product = require("../Model/ProductModel");
const User = require("../Model/UserModel");

const addFavourites = async (req, res) => {

    try {

        // console.log(req.body);
        const data = req.body
        const { userId, propertyId } = req.body;


        const userExist = await User.findById(userId);
        // console.log(propertyExist);
        if (!userExist) {

            return res.status(404).json({

                success: false,
                message: "User does not exist"
            })
        }

        const propertyExist = await Product.findById(propertyId)
        // console.log("user", userExist);
        if (!propertyExist) {
            return res.status(404).json({

                success: false,
                message: "Property does not exist"
            })
        }

        const favouriteExist = await Favourite.findOne({ userId: userId, propertyId: propertyId }).exec()
        // console.log(favouriteExist);


        if (favouriteExist) {
            return res.status(400).json({
                success: false,
                message: "Property is already in favourites",
            });
        }

        const favourite = {
            ...data
        }
        // console.log(favourite);


        const newFavourite = new Favourite(favourite)
        await newFavourite.save()

        res.status(200).json({

            success: true,
            message: "Added to favourite list"
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({

            status: false,
            message: "error, something went wrong"
        })
    }
}


const deleteFavourite = async (req, res) => {

    try {

        const favouriteId = req.params.id;
        // console.log(favouriteId);

        const favouriteExist = await Favourite.findById(favouriteId)

        console.log(favouriteExist);
        if (!favouriteExist) {

            res.status(404).json({

                message: "This item cannot be found",
                success: false
            })
        }

        await Favourite.deleteOne({ _id: favouriteId }).exec()

        res.status(200).json({

            message: "successfully deleted",
            success: true
        })

    } catch (error) {

        res.status(400).json({

            message: "Something went wrong",
            success: false
        })
    }
}

const getAllFavourites = async (req, res) => {

    try {

        const allFavourites = await Favourite.find().exec()
        // console.log(allFavourites);

        if (!addFavourites) {

            res.status(404).json({

                message: "No data was found",
                success: false
            })
        }

        res.status(200).json({

            data: allFavourites,
            message: "Fetched all data",
            success: true
        })
    } catch (error) {

        res.status(500).json({

            message: "Unknown error occured",
            success: false
        })
    }
}

const getFavouritesOfUser = async (req, res) => {

    try {

        const userId = req.params.id;
        const user = await User.findById(userId).exec()

        if (!user) {

            res.status(404).json({

                message: "User does not exist",
                status: false
            })
        }

        const favourites = await Favourite.find({ userId: userId })

        console.log(favourites);

        if (favourites) {

            res.status(200).json({

                data: favourites,
                status: true,
                message: "Fetched all favourite of this user"
            })
        }

    } catch (error) {

        res.status(404).json({

            status: false,
            message: "Some this went wrong"
        })
    }
}

module.exports = {

    addFavourites,
    deleteFavourite,
    getAllFavourites,
    getFavouritesOfUser
}