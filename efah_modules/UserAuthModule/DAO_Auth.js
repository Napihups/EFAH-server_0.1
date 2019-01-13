/**-------------------------------------------------------------------+
 * Filename : DAO_Auth
 * Author by : Napihup
 * Date of revision : 10-01-2019
 * Functions : Layers/API lib for interacting with DB  
 ---------------------------------------------------------------------*/


 /** Required modules */
const COMMANDS = require('../commons/commands');


/**SETUP FOR DATABASE CONNECTION */
var mysql = require('mysql');
var configs = {
    host: "localhost",
    port: '14456',
    user: "root",
    password: "s9324553i",
    database : 'EFAH_DEV_01'
}
var connection = mysql.createConnection(configs);
connection.connect(err => {
    if(err){
        console.log(err);
    }
    console.log("DB (Mysql) connection success on port : " + configs.port );
})


/** SCRIPTING (MYSQL) ----------------------------------------------*/

/**
 * Desc : to select the user entity based on USER_ID
 */
const GET_USER_BY_ID = 
`
SELECT 
USER.USER_ID AS USER_ID, USER.FULLNAME AS FULLNAME, USER.EMAIL AS EMAIL, USER.MOBILE_NUM AS MOBILE_NUM, UTYPE.USER_TYPE AS USER_TYPE
FROM T_01_EFAH_USER USER INNER JOIN T_01_EFAH_USER_TYPE UTYPE
ON USER.USER_TYPE_ID = UTYPE.TYPE_ID WHERE USER_ID = ?;
`

/**
 * Desc : Get Auth entity based on USERNAME
 */
const GET_AUTH_BY_USERNAME = 
`
SELECT * FROM T_01_EFAH_AUTH AS AUTH WHERE USERNAME = ?;
`

/** 
 * DESC : To validate if there is a duplicate USER information for EMAIL, MOBILE NO 
 * */
const VALIDATE_EXIST_USER = 
` 
select count(*) as val from
(
select * from EFAH_DEV_01.T_01_EFAH_USER where MOBILE_NUM = ? OR EMAIL = ?
) USER_C
`

/**
 * DESC : To validate if there is a duplicate USER information for EMAIL, MOBILE NO 
 * */
const VALIDATE_EXIST_AUTH = 
`
select count(*) as val from
(
select * from EFAH_DEV_01.T_01_EFAH_AUTH where USERNAME = ? OR PASSWORD = ?
) AUTH_C
`

/**
 * Desc : Inserting new User entity into T_01_EFAH_USER table
 */
const INSERT_USER = 
`
INSERT INTO EFAH_DEV_01.T_01_EFAH_USER (USER_ID, FULLNAME, EMAIL, MOBILE_NUM, USER_TYPE_ID)
VALUES (?, ?, ?, ?, ?)
`

/**
 * Desc : Inserting user data for Auth into T_01_EFAH_AUTH
 */
const INSERT_AUTH = 
`
INSERT INTO EFAH_DEV_01.T_01_EFAH_AUTH (USER_ID, USERNAME, PASSWORD)
VALUES (?, ?, ?)
`

/**
 * Desc : Inserting the token signed into the LDAP DB (for session tracking)
 */
const INSERT_TOKEN_LDAP =
`
INSERT INTO EFAH_LDAP_01.T_01_TOKEN_STAT (TOKEN, SIGN_STATE, TOKEN_SIGN_DT, TOKEN_SIGN_T, TOKEN_UNSIGN_DT, TOKEN_UNSIGN_T)
VALUES (?, 1, CURRENT_DATE(), CURTIME(), NULL, NULL)
`;






/**APIS------------------------------------------------------ */
function validateUserData(form) {
    let email = form.email;
    let mobile_num = form.mobile_num;
    return new Promise((resolve, reject) => {
        executeQuery(VALIDATE_EXIST_USER, [email, mobile_num], (err, sqlResult) => {
            if(err){
                reject(err);
            };
            resolve(sqlResult[0]);
        })
    })

}

function validateAuthData(form) {
    let username = form.username;
    let password = form.password;
    return new Promise((resolve, reject) => {
        executeQuery(VALIDATE_EXIST_AUTH, [username, password], (err, sqlResult) => {
            if(err){
                reject(err);
            }
            resolve(sqlResult[0]);
        })
    })
}



function insertNewUser(user) {
    let uid = user.uid;
    let fullname = user.fullname;
    let email = user.email;
    let mobile_num = user.mobile_num;
    let typeId = null;
    let username = user.username;
    let password = user.password

    switch(user.usertype) {
        case COMMANDS.USER_TYPE_STUDENT : typeId = COMMANDS.STUDENT_TYPE_ID; break;
        case COMMANDS.USER_TYPE_TEACHER : typeId = COMMANDS.TEACHER_TYPE_ID; break;
        default : typeId = COMMANDS.STUDENT_TYPE_ID
    }
    
    return new Promise((resolve, reject) => {
        executeQuery(INSERT_USER, [uid, fullname, email, mobile_num, typeId], (err) => {
            if(err){
                reject(err);
            }
            // insert auth data 
            executeQuery(INSERT_AUTH, [uid, username, password], (err) => {
                if(err) {
                    reject(err);
                }
                // returning the current user inserted to DB 
                executeQuery(GET_USER_BY_ID, [uid], (err, sqlResult) => {
                    if(err){
                        reject(err);
                    }
                    resolve(sqlResult[0]);
                })
            })
        })
    })
}


function searchAuthByUsername(username) {
    return new Promise((resolve, reject)=> {
        executeQuery(GET_AUTH_BY_USERNAME, [username], (err, sqlResult) => {
            if(err) reject(err);
            // console.log(sqlResult);
            resolve(sqlResult);
        })
    })
}


function getUserById(uid) {
    return new Promise((resolve, reject) => {
        executeQuery(GET_USER_BY_ID, [uid], (err, sqlResult) => {
            if(err) reject(err);
            resolve(sqlResult[0]);
        })
    })
}





/** Private functions ------------------------------------ */
/**
 * 
 * @param {*} script 
 * @param {*} params 
 * @param {*} callback 
 */
function executeQuery(script, params, callback) {
    connection.query(script, params, (err, result, fields) => {
        callback(err, result, fields)
    })
}




/** expose all modules */
exports.validateUserData = validateUserData;
exports.validateAuthData = validateAuthData;
exports.insertNewUser = insertNewUser;
exports.searchAuthByUsername = searchAuthByUsername;
exports.getUserById = getUserById;




