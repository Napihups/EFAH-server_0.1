var express = require('express');
app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var port = 4321;


app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port);
console.log('Server started at port : '  + port);
