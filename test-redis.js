const redis = require('redis');

var LDAP = redis.createClient(1456, '3.0.104.175'); 
LDAP.on('connect', (err) => {
    if(err) console.log(err);
    console.log('Redis LDAP successfully connected');
})


const mongoose = require('mongoose');




    