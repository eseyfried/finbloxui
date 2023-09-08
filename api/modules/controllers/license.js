const { User, Group } = require('../../models');
const moment = require('moment');

const getLicense = (async(req, res) => {
    // const { password } = req.body;
    const password = req.params.licenseKey;
    let licenseKey;
    let response = {
        data: {},
        status: 200
    };
    /**
     * strip "Bearer" from token
     */
    const extractPassword = (password) => {
        return password.split(" ")[1]
    }
    if (password.indexOf("Bearer") != -1) {
        licenseKey = extractPassword(password);
    } else {
        licenseKey = password;
    }
    
    try {
        const user = await User.findOne({
            where: {
                licenseKey: licenseKey
            },
            include: [
                {
                    model: Group,
                    as: 'Groups',
                },
            ]
        });
        if (!user) {
            throw new Error("You are unauthorized to access this package");
        }
        const isLicenseExpired = isExpired(user.licenseBeginsAt, user.licenseExpiresAt);
        if (isLicenseExpired) {
            throw new Error(`Your Finbloxui license has expired as of ${moment(user.licenseExpiresAt).format("MM-DD-YYYY")}`);
        }

        /**
         * Format response
         */
        const groups = user.Groups.map(group => group.name)
        response.data = {
            name: user.email,
            groups: groups
        }
        
    } catch (e) {
        response.status = 403;
        response.data = {
            message: e.message
        }
    }
    res.status(response.status).send(response.data);
})

// PRIVATE METHODS

/**
 * Is the license expired?
 * @param {String} licenseBeginsAt date YYYY-MM-DD HH:MM:SS
 * @param {*} licenseExpiresAt date YYYY-MM-DD HH:MM:SS
 * @returns Boolean
 */
const isExpired = (licenseBeginsAt, licenseExpiresAt) => {
    const today = moment();
    const _licenseBeginsAt = moment(licenseBeginsAt);
    const _licenseExpiresAt = moment(licenseExpiresAt);
    return !today.isBetween(_licenseBeginsAt, _licenseExpiresAt)
}

module.exports = {
    getLicense
}