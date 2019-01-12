// /**
//  * Module Name : mysql
//  * Utility : API transaction to mysql DB server for data
//  * Author by : Napihup
//  * Date of Revision : 10-01-2019
//  */
// var mysql = require('mysql');
// var configs = {
//     host: "localhost",
//     port: '14456',
//     user: "root",
//     password: "s9324553i",
//     database : 'EFAH_DEV_01'
// }
// var connection = mysql.createConnection(configs);
// connection.connect(err => {
//     if(err){
//         console.log(err);
//     }
//     console.log("DB (Mysql) connection success on port : " + configs.port );
// })


// /** 
//  * DESC : To get Entity object of USER based on USER_ID 
//  * */
// const GET_USER_BY_ID = 'select * from T_01_EFAH_USER where USER_ID = ?';

// /** 
//  * DESC : To validate if there is a duplicate USER information for EMAIL, MOBILE NO 
//  * */
// const VALIDATE_EXIST_USER = `select
// case when USER.cnt > 0 then 'EXIST' else 'NOT-EXIST' end as count from (
// select count(*) as cnt from
// (
// select * from T_01_EFAH_USER where MOBILE_NUM = ? OR EMAIL = ?
// ) USER_C
// )USER `

// /**
//  * DESC : To validate if there is a duplicate USER information for EMAIL, MOBILE NO 
//  * */
// const VALIDATE_EXIST_AUTH = `
// select
// case when AUTH.cnt > 0 then 'EXIST' else 'NOT-EXIST' end as result from (
// select count(*) as cnt from
// (
// select * from T_01_EFAH_AUTH where USERNAME = ? OR PASSWORD = ?
// ) AUTH_C
// )AUTH;
// `
// /**----------------------------------------------------------------------------- */


// /**
//  * Author by : Napihup
//  * Date of Revision : 10-01-2019
//  * return : con
//  */
// function selectQ(script, params, callback) {
//     connection.query(script, params, (err, result, fields) => {
//         callback(err,result, fields)
//     })
// }


// function getUserById(id) {
//     let params = [id];
//     connection.query(GET_USER_BY_ID, params, (err, result, fields) => {
//         if(err) throw err;
//         return ({result: result, fields : fields});
//     })
// }

// function validateExistingUserReg(signFormData) {
//     let data = {
//         fullname : signFormData.fullname,
//         email : signFormData.email,
//         mobile_num : signFormData.mobile_num,
//         username : signFormData.username,
//         password : signFormData.password
//     }

//     var valExistUser = new Promise((resolve, reject) => {
//         selectQ(VALIDATE_EXIST_USER, [data.email, data.mobile_num], (err, result, fields) => {
//             if(err){
//                 reject(err);
//             };
//             resolve(result);
//         })
//     });

//     return valExistUser;

// }



// /** expose all modules */
// exports.getUserByID = getUserById;
// exports.validateExistingUserReg = validateExistingUserReg;
