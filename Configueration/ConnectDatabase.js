
const mongoose = require('mongoose');


const ConectDatabase = async () => {

    try {

        await mongoose.connect(`${process.env.MONGO_DB_CONNECTION_STING}`);
        console.log("Database Connected successfully");

    } catch (error) {

        console.log("Database connected Error", error);
        process.exit(1); // Exit the process if the connection fails

    }
}

module.exports = ConectDatabase;