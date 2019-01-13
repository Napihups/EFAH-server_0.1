var express = require('express');
app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var port = 4321;


const redis = require('redis');

let LDAP = redis.createClient();

LDAP.on('connect', ()=> {
    console.log('Redis LDAP connected')
})


// LDAP.HGETALL("LDAP_TOKEN:BLACKLIST:T248866GHTY5", (err, result) => {
//     let token = result.TOKEN;
//     let dts = result.DTS;
//     console.log(token);
//     console.log(dts)
// })

let tID = "T1098736df23GTH";
LDAP.HMSET("LDAP_TOKEN_STAT:BLACKLIST:" + tID, {Token : tID , Dts : "2019-01-09"}, (err, r) => {
    if(err) console.log(err);
    console.log(r);
    LDAP.HGET("LDAP_TOKEN_STAT:BLACKLIST:" + tID, "Token",(err, result) => {
        if(err)console.log(err);
        console.log(result);
        if(result === null) {
            console.log('not in blacklist')
        }else {
            console.log(result);
        }
        // console.log(dts)
    })
})


app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port);
console.log('Server started at port : '  + port);
