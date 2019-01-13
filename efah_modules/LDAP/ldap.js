/**-------------------------------------------------------------------+
 * Filename : LDAP
 * Author by : Napihup
 * Date of revision : 13-01-2019
 * Functions : Handling all process on redis cache storage for LDAP
 * associate features  
 ---------------------------------------------------------------------*/

 /** required modules */
const redis = require('redis');
const COMMANDS = require('../commons/commands');


/** setup connection */
var LDAP = redis.createClient();
LDAP.on('connect', (err) => {
    if(err) console.log(err);
    console.log('Redis LDAP successfully connected');
})





/**
 * to update signed token to LDAP and passing back the token ID 
 * @param {*} token 
 * @Resolve token id
 */
function updateTokenToLDAP (token, tid) {
   return new Promise((resolve, reject) => {
        insertTokenData(token, tid)
        .then(() => {
            resolve();
        })
        .catch(err => reject(err));
   })
}

function checkTokenValid (tid) {
    return new Promise((resolve, reject) => {
        getTokenHash(tid).then(r => resolve(r)).catch(err => reject(err));
    })
}


/** private functions ---------------------------------------------- */

function insertTokenData(token, tId){
    let key = COMMANDS.LDAP_TOKEN_BASED_KEY + COMMANDS.LDAP_BLACKLIST_KEY
    + tId;

    return new Promise((resolve, reject) => {
        
        //using current datetime of server 
        LDAP.hmset(key, {"Token" : token, Dts : Date.now()}, (err, r) => {
            if(err) reject(err);
            resolve(r);
        }) 
    })
}


function getTokenHash (tid) {
    let key = COMMANDS.LDAP_TOKEN_BASED_KEY + COMMANDS.LDAP_BLACKLIST_KEY
    + tid;

    return new Promise((resolve, reject) => {

        LDAP.hget(key, "Token", (err, result) => {
            if(err) reject(err);
            if(result === null){
                resolve(true)
            }else {
                resolve(false)
            }
        })
    })
    
}



/** expose modules */
exports.updateToken = updateTokenToLDAP;
exports.checkTokenValid = checkTokenValid;



