/**
 * Filename : User Routes
 * Author by : Napihups
 * Date of revision : 20-01-2019
 * Functions : Server route request for handline User related data 
 ---------------------------------------------------------------*/

 /**Required modules */
const express = require('express');
const router = express.Router();
const services = require('../UserAuthModule/SERVICE_Auth');


/**
 * To get basic user account infomation 
 * @Body {not applicable}
 * @Params [token]
 */
router.get('/', services.validateAuthentication, (req, res) => {
    res.json({success: true, payload : res.user});
})

/** Expose modules --------------------*/
module.exports = router;