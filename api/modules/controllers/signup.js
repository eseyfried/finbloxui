const { User, Group, UserGroup } = require('../../models');
const db = require('../../models/index');
const moment = require('moment');
const mail = require('../mailer');
const { config } = require(__dirname + '/../config/config.js')


const createTrialAccount = (async (req, res) => {
    const { email } = req.body;
    let response = {
        data: {},
        status: 200
    };
    response.data.email = email;
    const transaction = await db.sequelize.transaction()
    try {
        /**
         * create user
         */
        const user = await User.create({
            email: email,
            licenseBeginsAt: moment().format("YYYY-MM-DD"),
            licenseExpiresAt: moment().add(1, "year").format("YYYY-MM-DD"),
            licenseType: "trial",
        }, { transaction: transaction });
        /**
         * add user to trial group
         */
        const groups = await Group.findAll({
            where: {
                name: ["access","trial", "$authenticated"]
            }
        });

        await Promise.all(groups.map(async (group) => {
            console.log("%s %s %s", email, user.id, group.id)
            const [userGroup, created] = await UserGroup.findOrCreate({
                where: { 
                    userId: user.id,
                    groupId: group.id,
                },
                defaults: {
                    userId: user.id,
                    groupId: group.id,
                },
                transaction: transaction
            });
            if (created) {
                console.log("[%s] was added to group [%s]", email, group.name);
                /**
                 * send email
                 */
                const mailer = await mail()
                    
                let info = await mailer.sendMail({
                    from: `"FinbloxUI" <${config.site_email}>`, // sender address
                    to: email, // list of receivers
                    subject: "Thank you for signing up for FinbloxUI", // Subject line
                    template: 'trial-welcome',
                    context: {
                        email: email,
                        licenseKey: user.licenseKey,
                        licenseBeginsAt: moment(user.licenseBeginsAt).format("MM-DD-YYYY"),
                        licenseExpiresAt: moment(user.licenseExpiresAt).format("MM-DD-YYYY"),
                    }
                });
            }
        }));
        await transaction.commit()
    } catch (e) {
        await transaction.rollback()
        response.status = 500;
        let message = e.message;
        if (e.original.code === "ER_DUP_ENTRY") {
            response.status = 409; // resource conflict
            message = "Oh boy...we were unable to create a new account for this email."
        }
        response.data = {
            message: message
        }
    }

    res.status(response.status).send(response.data);
});

module.exports = {
    createTrialAccount
}