const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
app.use(router);

// load controller modules

const  { 
    getLicense
} = require('./modules/controllers/license.js');
const  { 
    createTrialAccount
} = require('./modules/controllers/signup.js');
const  { 
    addPackage,
    listPackages
} = require('./modules/controllers/packages.js');
  
app.get('/', async function (req, res) {
    res.send("OK");
})

app.get('/health', async function (req, res) {
    
    res.send("UP");
})

router.get('/authenticate/:licenseKey', getLicense)

app.post('/trial', createTrialAccount);

// packages
app.post('/package', addPackage);
app.get('/package', listPackages);

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})