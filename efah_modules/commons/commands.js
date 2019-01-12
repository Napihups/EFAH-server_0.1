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
    TEACHER_TYPE_ID : 2
}


/** expose commands module */
module.exports = COMMANDS;