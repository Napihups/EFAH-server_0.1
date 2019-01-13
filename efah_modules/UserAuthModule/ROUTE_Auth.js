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
 * Router full endpoint : /auth/signin
 * @PostBody {username, password}
 * @Return {success, token}
 */
router.post('/signin', (req, res) => {
    let credentials = req.body;
    services.doSigninUser(credentials, (token) => {
        res.json({success: true, payload: token});
    })
})


/**
* Router full endpoint : /auth/signout
 * @PostBody {token}
 * @Return {success, r} 
 */
router.get('/signout', (req, res) => {
    let token = req.body.jwt_token;
    services.doSignoutUser(token, (r) => {
        if(r){
            res.json({success: true, payload : r});
        }
        res.json({success: false, payload: "User not successfully log out "})
    })
})

/** For testing only ----------- */
router.get('/test', services.validateAuthentication , (req, res) => {
    
    res.json({success: true, payload: res.user} )
} )



/** Expose modules --------------------*/
module.exports = router;