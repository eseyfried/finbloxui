const { Packages } = require('../../models');
const db = require('../../models/index');



const addPackage = (async (req, res) => {
    const { name, version, fileName } = req.body;
    let response = {
        data: {},
        status: 200
    };

    const transaction = await db.sequelize.transaction()
    try {
        /**
         * create package
         */
        const npmPackage = await Packages.create({
            packageName: name,
            packageVersion: version,
            fileName: fileName,
        }, { transaction: transaction });
        transaction.commit();
        response.data = npmPackage;
    } catch (e) {
        await transaction.rollback()
        response.status = 500;
        let message = e.message;
        response.data = {
            message: message
        }
    }

    res.status(response.status).send(response.data);
});

const listPackages = (async (req, res) => {
    let response = {
        data: {},
        status: 200
    };
    try {
        const packages = await Packages.findAll({
            order: [
                ["createdAt", "DESC"]
            ]
        });
        response.data = packages;
    } catch (e) {
        response.status = 500;
        let message = e.message;
        response.data = {
            message: message
        }
    }
    res.status(response.status).send(response.data);
});

module.exports = {
    addPackage,
    listPackages
}