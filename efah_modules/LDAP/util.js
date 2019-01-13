/**-------------------------------------------------------------------+
 * Filename : util
 * Author by : Napihup
 * Date of revision : 13-01-2019
 * Functions : Utilities for Redis LDAP   
 --------------------------------------------------------------------*/


/**
 * to generate new signed token identifier for LDAP 
 */
 function generateTokenID() {

    let a = Math.random().toString(36).substring(7);
    let b = Math.random().toString(36).substring(7);

    let TID = a + b;

    return TID;
 }


 /** expose modules */
 exports.generateTokenID = generateTokenID;