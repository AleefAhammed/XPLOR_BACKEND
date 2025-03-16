const Host = require("../Model/HostModel");
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createHost = async (req, res) => {

    // console.log(req.body);

    try {

        const host = req.body

        if (!host.password) {

            res.status(400).json({
                message: "Password is required",
            });
        }

        const hashedPassword = bcrypt.hashSync(host.password, saltRounds)
        const newHost = new Host({ ...host, password: hashedPassword })

        await newHost.save()

        res.json({

            data: newHost,
            message: "Your account is successfully created"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "Cannot create account"
        })
    }
}

const hostLogin = async (req, res) => {

    try {

        // console.log(req.body);

        const { email, password } = req.body;
        const hostExist = await Host.findOne({ email: email })
        console.log(hostExist);



        if (!hostExist) {

            res.status(404).json({

                success: false,
                message: "Entered a valid email"
            })
        }

        const passwordMatched = bcrypt.compareSync(password, hostExist.password)

        res.status(200).json({

            success: true,
            message: "You have been successfully login"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "something went up"
        })
    }

}

const getAllHost = async (req, res) => {

    try {

        const allHost = await Host.find().exec()
        console.log(allHost);

        res.json({

            data: allHost,
            message: "Successfully fetched all users"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "Cannot get users"
        })

    }

}

const getHostById = async (req, res) => {

    try {

        const hostId = req.params.id
        const host = await Host.findById(hostId).exec()

        res.json({

            data: host,
            message: "Successfully fetched host details by id"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "The host is not available"
        })
    }
}

const updateHost = async (req, res) => {

    try {

        const hostId = req.params.id;

        const host = await Host.findById({ _id: hostId }).exec();
        console.log(host);


        if (!host) {

            return res.status(400).json({
                message: "Cannot find host",
            });
        }

        const updatedHost = Object.assign(host, req.body);
        await host.save()

        res.json({

            data: updateHost,
            message: "Updated successfully"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "cannot update the host"
        })
    }

}

const deleteHostAccount = async (req, res) => {

    try {

        const hostId = req.params.id;
        // const user = await User.findById(userId).exec();
        await Host.deleteOne({ _id: hostId }).exec()

        res.json({

            message: "host have ben deleter successfully"
        })

    } catch (error) {

        res.json({

            data: error,
            message: "The host is not available"
        })
    }

}

module.exports = {
    createHost,
    hostLogin,
    getAllHost,
    getHostById,
    deleteHostAccount,
    updateHost
}