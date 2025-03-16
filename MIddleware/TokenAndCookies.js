const { configDotenv } = require('dotenv')
const jwt = require('jsonwebtoken')

configDotenv()

const createToken = async (data) => {

    // console.log(data);


    const token = jwt.sign(

        { id: data._id, userName: data.name, email: data.email },
        process.env.JWT_SECRET_KEY,
    );

    // console.log(token);

    return token;
}

const cookieSafetyMeasures = {

    httpOnly: true,
    secure: process.env.ENVIRONMENT === "Production" ? true : false,
    maxAge: 1 * 60 * 60 * 1000,
    sameSite: process.env.ENVIRONMENT === "Production" ? true : false
}

module.exports = {

    createToken,
    cookieSafetyMeasures
}