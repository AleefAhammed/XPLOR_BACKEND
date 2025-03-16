const { configDotenv } = require('dotenv')
const jwt = require('jsonwebtoken')
configDotenv()

const checkLogin = async (req, res, next) => {

    if (req.cookies.token) {

        // console.log("token", req.cookies);

        try {

            const tokenData = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY)
            // console.log("data :", tokenData);
            if (tokenData) {

                req.user = tokenData
            }
            next()

        } catch (error) {

            res.status(401).send({
                success: false,
                message: "Unautherised Token access"
            })
        }
    } else {
        res.status(404).send({
            success: false,
            message: "No user"
        })
    }

}

module.exports = checkLogin