const Product = require("../Model/ProductModel");
const User = require("../Model/UserModel");
const { ObjectId } = require('mongodb');

const addProduct = async (req, res) => {


    try {
        // console.log(req.body);
        // if (req.body) {
        //     console.log('form data', req.body);
        // }
        // if (req.files) {
        //     console.log('form data', req.body);
        // }

        // console.log("Form Data:", req.body);
        const imageUrls = req.files.map((file) => file.path);
        // console.log(imageUrls);

        // Parse JSON fields
        const parsedAmenities = JSON.parse(req.body.amenities || "[]");
        const parsedContactDetails = JSON.parse(req.body.contactDetails || "{}");
        const parsedFacilities = JSON.parse(req.body.facilities || "{}");
        const { id } = JSON.parse(req.body.createdBy || "");
        // console.log(id);

        // console.log("Parsed Amenities:", parsedAmenities);
        // console.log("Parsed Contact Details:", parsedContactDetails);
        // console.log("Parsed Facilities:", parsedFacilities);
        // console.log("Parsed created by :", id);

        const data = {
            ...req.body,
            amenities: parsedAmenities,
            contactDetails: parsedContactDetails,
            facilities: parsedFacilities,
            images: imageUrls,
            createdBy: id
        }
        // console.log(data);

        const newProduct = new Product(data);
        await newProduct.save()

        // Simulated response
        res.status(200).json({
            success: true,
            data: {
                ...req.body,
                amenities: parsedAmenities,
                contactDetails: parsedContactDetails,
                facilities: parsedFacilities,
                images: imageUrls,
                createdBy: id
            },
            message: "Data added successfully"
        });


    } catch (error) {

        res.status(404).json({

            success: false,
            message: "Cound not add data"
        })
    }
}

const getAllProducts = async (req, res) => {

    try {

        const allProducts = await Product.find().exec()
        // console.log(allProducts);

        return res.status(200).json({

            data: allProducts,
            status: true,
            message: "Fetched all products"
        })

    } catch (error) {

        res.status(400).json({

            message: "Cannot fetch products",
            status: false
        })
    }
}


const deleteProduct = async (req, res) => {

    try {

        const productId = req.params.id;
        const { id } = req.user;
        // console.log(productId, user);

        const productExist = await Product.findById(productId).exec()
        // console.log(productExist);
        if (!productExist) {

            res.status(404).json({

                success: false,
                message: "cannot find the product"
            })
        }

        const userExist = await User.findById(id).exec()
        // console.log(userExist);

        if (!userExist) {

            res.status(404).json({

                success: false,
                message: "user not found"
            })
        }

        const productToDelete = await Product.findOne({ createdBy: id })
        // console.log(productToDelete);
        if (!productToDelete) {

            res.status(400).json({

                message: "Product was not uploaded by this user",
                success: false
            })
        }

        await Product.deleteOne({ _id: productId }).exec()
        res.json({

            message: "Product have deleted successfully",
            success: true
        })

    } catch (error) {

        res.status(400).json({

            message: "something went wrong",
            status: false
        })
    }

}

const updateProduct = async (req, res) => {

    try {

        const productId = req.params.id;
        // console.log(req.body);

        const product = await Product.findById({ _id: productId }).exec()
        // console.log(product);

        if (!product) {

            res.status(404).json({

                success: false,
                message: "cannot find the product"
            })
        }

        const { id: userId } = req.user
        // console.log(userId);
        const userExist = await User.findById({ _id: userId })
        // console.log(userExist);
        if (!userExist) {

            res.status(404).json({

                message: "user not found",
                success: false
            })
        }

        const parsedAmenities = JSON.parse(req.body.amenities || "[]");
        const parsedContactDetails = JSON.parse(req.body.contactDetails || "{}");
        const parsedFacilities = JSON.parse(req.body.facilities || "{}");
        const { id: createdBy } = JSON.parse(req.body.createdBy || "");

        if (req.files.length === 0) {


            // console.log(createdBy, parsedAmenities, parsedContactDetails, parsedFacilities);
            const newData = {
                ...req.body,
                amenities: parsedAmenities,
                contactDetails: parsedContactDetails,
                facilities: parsedFacilities,
                createdBy,
            };
            const updatedProduct = await Product.findByIdAndUpdate(productId, newData, { new: true });
            res.status(200).json({
                data: updatedProduct,
                success: true,
                message: "Product updated successfully",
            });
        } else if (req.files.length > 0) {

            const imageUrls = req.files.map((file) => file.path);
            const newData = {
                ...req.body,
                amenities: parsedAmenities,
                contactDetails: parsedContactDetails,
                facilities: parsedFacilities,
                createdBy,
                images: imageUrls
            };
            const updatedProduct = await Product.findByIdAndUpdate(productId, newData, { new: true });
            res.status(200).json({
                data: updatedProduct,
                success: true,
                message: "Product updated successfully",
            });
        }

    } catch (error) {

        res.status(400).json({

            message: "something went wrong",
            status: false
        })
    }

}

const getProductById = async (req, res) => {

    try {

        const productId = req.params.id;
        // console.log(productId);

        const product = await Product.findById(productId).populate('createdBy', '-password -__v').exec();
        // console.log(product);

        if (!product) {

            return res.status(404).json({

                status: false,
                message: "Cannot find this product"
            })
        }

        return res.status(200).json({

            data: product,
            status: true,
            message: "Successfully fetched the product details"
        })

    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({

            message: "something went wrong",
            status: false
        })
    }

}

const getUserUploadedProducts = async (req, res) => {

    try {

        const userId = req.params.id
        // console.log(userId);

        const userExist = await User.findById(userId)
        if (!userExist) {

            return res.status(404).json({

                message: "THis user does not exist",
                status: false
            })
        }
        const id = new ObjectId(userId)
        const products = await Product.find({ createdBy: id }).exec();

        // console.log(products);


        if (!products) {

            return res.status(404).json({

                message: "No Products found",
                status: false
            })
        }

        res.status(200).json({

            data: products,
            message: "Successfully fetched all products uploaded by the user",
            status: true,
        })
    } catch (error) {

        console.error("Error fetching products by user:", error);
        res.status(500).json({

            message: "something went wrong",
            status: false
        })
    }
}

module.exports = {

    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getUserUploadedProducts
}
