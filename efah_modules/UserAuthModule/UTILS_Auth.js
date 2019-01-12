/**-------------------------------------------------------------------+
 * Filename : UTILS_Auth
 * Author by : Napihup
 * Date of revision : 10-01-2019
 * Functions : The utilities for the module of Auth_module
 * which include with Authorization/Authentication, signup and delete  
 ---------------------------------------------------------------------*/


 /** Required modules */
 const COMMANDS = require('../commons/commands');


 /**
  * Generate random digits with specified prefix
  * of the user type 
  * @param {} userType 
  */
 function generateNewUniqueId(userType) {

    let a = Math.floor(Math.random() * 9) + 0
    let b = Math.floor(Math.random() * 9) + 0
    let c = Math.floor(Math.random() * 9) + 0
    let d = Math.floor(Math.random() * 9) + 0
    let e = Math.floor(Math.random() * 9) + 0
    let f = Math.floor(Math.random() * 9) + 0

    let prefix = null;
    switch(userType) {
        case COMMANDS.USER_TYPE_STUDENT : prefix = COMMANDS.STUDENTID_PREFIX; break;
        case COMMANDS.USER_TYPE_TEACHER : prefix = COMMANDS.TEACHERID_PREFIX; break;
        default : prefix = COMMANDS.STUDENTID_PREFIX; break;
    }

    var ID = prefix + a + b + c + d + e + f
    return ID;
 }




 /** expose all modules */
 exports.generateUID = generateNewUniqueId;