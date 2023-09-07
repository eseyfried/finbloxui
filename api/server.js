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
    
    res.send("OK");
})

app.get('/health', async function (req, res) {
    
    res.send("UP");
})

router.get('/authenticate/:licenseKey', getLicense)

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