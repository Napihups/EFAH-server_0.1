/**
 * Filename : commands 
 * Author by : Napihup
 * Date of revision : 12-01-2019
 * Function : constants for messages used for all part of the server api 
 --------------------------------------------------------------------------*/

const COMMANDS = {
    /** */
    USERDATA_EXIST : 'user data is existed',
    /** */
    USERDATA_NOT_EXIST : 'user data not exist',
    /** */
    TOKEN_SIGN_FAILED : 'Failed to sign token from user',
    /** */
    PASSWORD_MATCH_FAILURE : "Password is invalid",
    /** */
    USER_TYPE_STUDENT : 'STUDENT',
    /** */
    USER_TYPE_TEACHER : 'TEACHER',
    /** */
    STUDENTID_PREFIX : 'S',
    /** */
    TEACHERID_PREFIX : 'T',
    /** */
    STUDENT_TYPE_ID : 1,
    /** */
    TEACHER_TYPE_ID : 2,
    /** */
    TOKEN_SIGNING : 'TOKEN_SIGNING',
    /** */
    TOKEN_UNSIGNING : 'TOKEN_SIGNING',

    /** LDAP related commands  */

    LDAP_TOKEN_BASED_KEY : 'LDAP_TOKEN_STAT:',
    LDAP_BLACKLIST_KEY : 'BLACKLIST:',
    LDAP_TOKEN_FIELD : 'TOKEN',
    LDAP_DTS_FIELD : 'DTS',
    LDAP_SET_SUCCESS : 'OK'
}


/** expose commands module */
module.exports = COMMANDS;