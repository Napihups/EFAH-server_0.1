/**-------------------------------------------------------------------+
 * Filename : SERVICE_Auth
 * Author by : Napihup
 * Date of revision : 10-01-2019
 * Functions : Handling all process of Auth associated feature 
 * which include with Authorization/Authentication, signup and delete  
 ---------------------------------------------------------------------*/

/** required modules ----------------------  */
const authDAO = require('./DAO_Auth');
const COMMANDS = require('../commons/commands');
const UTILS = require('./UTILS_Auth');
const JWT = require('jsonwebtoken');
const appProps = require('../../configs/properties');






/**
 * process the registration of new user into DB 
 * @param {usertype, fullname, email, mobile_num,username, password} user 
 */
function doSignupUser(user, callback) {
    processingUserRegistration(user)
    .then(token => {
        callback(token);
    })
    .catch(err => {
        switch(err) {
            case COMMANDS.USERDATA_EXIST : console.log(COMMANDS.USERDATA_EXIST); break;
            case COMMANDS.TOKEN_SIGN_FAILED : console.log(COMMANDS.TOKEN_SIGN_FAILED);break;
            default : console.log("Unknown error "); break;
        }
    })
}




/**
 * handling the login authentication with credentials provided
 * @param {*} credential 
 * @param {*} callback 
 */
function doLoginUser(credential, callback) {
    authenticateUser(credential)
    .then(token => {
        callback(token);
    })
    .catch(err => {
        switch(err) {
            case COMMANDS.PASSWORD_MATCH_FAILURE : console.log( COMMANDS.PASSWORD_MATCH_FAILURE); break;
            case COMMANDS.TOKEN_SIGN_FAILED : console.log(COMMANDS.TOKEN_SIGN_FAILED);break;
            default : console.log("Unknown error "); break;
        }
    })
}



/** PRIVATE FUNCTIONS ------------------------------------------------ 
 * 
---------------------------------------------------------------------*/

/**
 * To check for Duplicates data found of the new 
 * registered user in the database
 * @param {*} user 
 */
function processingUserRegistration(user) {
    return new Promise((resolve, reject) => {
        authDAO.validateUserData(user)
        .then(result => {
            if(result.val > 0){
                reject(COMMANDS.USERDATA_EXIST)
            } else {
                return authDAO.validateAuthData(user);
            }
        })  
        .then(result => {
            if(result.val > 0) {
                reject(COMMANDS.USERDATA_EXIST)
            }else {
                // register user entity 
                user.uid = UTILS.generateUID(user.usertype);
                return authDAO.insertNewUser(user);
            }
        })
        .then((user) => {
            // sign the user token
            JWT.sign({user: user}, appProps.JWT.secret, (err, token) => {
                if(!err){
                    resolve(token);
                }else {
                    console.log(err);
                    reject(COMMANDS.TOKEN_SIGN_FAILED);
                }
            })
        })
        .catch(() => {
            reject(COMMANDS.USERDATA_EXIST);
        })
    })
}


/**
 * Process authentication and sign new token for current authenticated user 
 * @param {*} credential 
 */
function authenticateUser(credential) {
    return new Promise((resolve, reject) => {
        authDAO.searchAuthByUsername(credential.username)
        .then(result => {
            if(result.length === 0){
                //no username found
            }else if(result.length === 1) {

                // if username found 
                let dbPass = result[0].PASSWORD;
                let uid = result[0].USER_ID;
                let passMatched = matchPassword(credential.password, dbPass);
                if(passMatched) {
                    return authDAO.getUserById(uid); 
                }else {
                    reject(COMMANDS.PASSWORD_MATCH_FAILURE);
                }
            }
        })
        .then(user => {
            // sign token with user object 
            JWT.sign({user: user}, appProps.JWT.secret, (err, token) => {
                if(err) reject(COMMANDS.TOKEN_SIGN_FAILED);
                resolve(token);
            })
        })
        .catch(err => {
            reject(err);
        })
    })
}


function matchPassword(givenPass, dbPass) {
    if(givenPass === dbPass){
        return true;
    }else {
        return false;
    }
}



/**expose modules ---------------- */
exports.doSignupUser = doSignupUser;
exports.doLoginUser = doLoginUser;