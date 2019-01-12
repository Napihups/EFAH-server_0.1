/**
 * Filename : ROUTE_Auth
 * Author by : Napihups
 * Date of revision : 12-01-2019
 * Functions : The utilities for the module of Auth_module
 * See details docs on each functions available in this utils
 ---------------------------------------------------------------*/

/**Required modules */
const express = require('express');
const router = express.Router();
const services = require('./SERVICE_Auth');

/**
 * Router full endpoint : /auth/signup
 * @PostBody {usertype, fullname, email, mobile_num, username, password} 
 * @Return {success, token}
 */
router.post('/signup', (req, res) => {
    let newUser = req.body;
     services.doSignupUser(newUser, (token) => {res.json({success: true, payload: token});});
})

/**
 * Router full endpoint : /auth/authentication
 * @PostBody {username, password}
 */
router.post('/authentication', (req, res) => {
    let credentials = req.body
    services.doLoginUser(credentials, (token) => {res.json({success: true, payload: token});})
})

/** Expose modules --------------------*/
module.exports = router;