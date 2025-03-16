const { createToken, cookieSafetyMeasures } = require("../MIddleware/TokenAndCookies");
const User = require("../Model/UserModel");
const bcrypt = require('bcrypt')
const saltRounds = 10;

const createUser = async (req, res) => {

    // console.log(req.body);

    try {

        const user = req.body

        if (!user.password) {

            return res.status(400).json({
                message: "Password is required",
            });
        }

        const hashedPassword = bcrypt.hashSync(user.password, saltRounds)
        const newUser = new User({ ...user, password: hashedPassword })
        // console.log(newUser);
        await newUser.save()

        const token = await createToken(newUser);
        const { _id } = newUser
        // console.log(_id);

        const userDetails = await User.findById({ _id: _id }).select("-password -__v").exec()
        // console.log(userDetails);

        res.cookie('token', token, cookieSafetyMeasures)
        return res.json({
            data: userDetails,
            message: "Your account is successfully created",
            success: true
        })

    } catch (error) {

        res.json({

            data: error,
            message: "Cannot create account"
        })
    }
}

const userLogin = async (req, res) => {
    try {
        // console.log(req.body); // Debugging purpose

        const { email, password } = req.body;

        // Check if the user exists
        const userExist = await User.findOne({ email: email });
        // console.log(userExist);

        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "Email is incorrect",
            });
        }
        const user = await User.findOne({ email: email }).select("-password -__v").exec()
        // console.log(user);


        // Compare password securely
        const passwordMatched = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatched) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const token = await createToken(userExist)
        res.cookie('token', token, cookieSafetyMeasures)
        // Successful login
        res.status(200).json({
            data: user,
            success: true,
            message: "You have successfully logged in",
        });

    } catch (error) {
        // console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message, // More informative error message
        });
    }
};


const getAllUSer = async (req, res) => {

    try {

        const allUser = await User.find().exec()
        // console.log(allUser);

        res.json({

            data: allUser,
            message: "Successfully fetched all users"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "Cannot get users"
        })

    }

}

const getUserById = async (req, res) => {

    try {

        const userId = req.params.id
        const user = await User.findById(userId).select("-password -__v").exec()

        res.json({

            data: user,
            message: "Successfully fetched user details by id"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "The user is not available"
        })
    }
}

const updateUser = async (req, res) => {

    try {

        // console.log(req.body);
        const user = req.body;

        const image = req.file.path
        const { gender } = req.body

        const { id } = req.body;
        const userExist = await User.findById({ _id: id }).exec();
        // console.log(user);

        if (!userExist) {

            return res.status(400).json({
                message: "Cannot find user",
                success: false
            });
        }

        const newData = {
            ...req.body,
            image: image
        }
        // console.log(newData);


        const updatedUser = await User.findByIdAndUpdate(id, newData)
        // console.log(updatedUser);

        return res.status(200).json({

            data: updatedUser,
            message: "Updated successfully",
            success: true
        })

    } catch (error) {

        res.json({

            success: false,
            data: error,
            message: "cannot update the user"
        })
    }

}

const deleteUserAccount = async (req, res) => {

    try {

        const userId = req.params.id;
        // const user = await User.findById(userId).exec();
        await User.deleteOne({ _id: userId }).exec()

        res.json({

            message: "user have ben deleter successfully"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "The user is not available"
        })
    }

}

const userVerification = async (req, res, next) => {

    try {

        let data;
        if (req.user) {

            data = req.user
        }
        next();
        // console.log("data:", data);

        res.status(200).json({
            success: true,
            message: "autherised access",
            data: data
        })

    } catch (error) {

        res.status(404).json({

            success: false,
            message: "access failed"
        })
    }


}


module.exports = {

    createUser,
    userLogin,
    getAllUSer,
    getUserById,
    updateUser,
    deleteUserAccount,
    userVerification
}