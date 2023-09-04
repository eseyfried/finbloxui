const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
app.use(router);
const { User, Group } = require('./models');
const  moment = require('moment');

const  { 
    getLicense
} = require('./modules/controllers/license.js')
  
app.get('/', async function (req, res) {
    const user = await User.findOne({
        include: [
            {
                model: Group,
                as: 'Groups',
            },
        ]
    });
    res.send(user);
})

router.get('/authenticate/:licenseKey', getLicense)
/*
app.post('/authenticate', async (req, res) => {
    const { password } = req.body;
    let licenseKey;
    let response;
    const extractPassword = (password) => {
        return password.split(" ")[1]
    }
    if (password.indexOf("Bearer") != -1) {
        licenseKey = extractPassword(password);
    }
    
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
    if (user) {
        const groups = user.Groups.map(group => group.name)
        response = {
            name: user.email,
            groups: groups
        }
        console.log("Validate license key: %s", licenseKey)
        console.log(response)
    } else {
        res.status(403);
        response = {
            message: "You are unauthorized to access this package"
        }
    }
    res.send(response);
});
*/
app.post('/signup', async (req, res) => {
    const user = await User.create({
        firstName: "Jane",
        lastName: "Doe",
        organizationName: "Care Co.",
        licenseExpiresAt: moment().add(1, "year").format("YYYY-MM-DD"),

    });
    res.send(user)
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})