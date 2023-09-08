const { User, Group } = require('../../models');
const moment = require('moment');



const createTrialAccount = (async (req, res) => {
    let response = {
        data: {},
        status: 200
    };

    try {
        /**
         * create user
         */
        const user = await User.create({
            firstName: "Jane",
            lastName: "Doe",
            organizationName: "Care Co.",
            licenseExpiresAt: moment().add(1, "year").format("YYYY-MM-DD"),
    
        });
        /**
         * add user to trial group
         */
        res.send(user)
    } catch (e) {
        response.status = 403;
        response.data = {
            message: e.message
        }
    }

    res.status(response.status).send(response.data);
});

module.exports = {
    createTrialAccount
}