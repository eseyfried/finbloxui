var express = require('express');
var app = express();
const { User } = require('./models');
  
app.get('/', async function (req, res) {
    const users = await User.findAll();
    res.send(users);
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})