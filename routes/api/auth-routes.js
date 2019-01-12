const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const props = require('../../configs/properties');

const UserDoc = require('../../models/user');

const UserUtil = require('../../utils/user-utils');

/** import efah modules */
const mysql = require('../../efah_modules/mysql');


//code
router.post('/google', (req, res) => {
    // to do code 
    //find and val user exist in DB
    // console.log(req.body.user);
    // console.log(req);
    UserDoc.findOne({publicUID : req.body.user.googleId})
        .then(curUser => {
            if(curUser) {
                //if user already exist <code>,
                // console.log('U r already existed in our DB ')
                jwt.sign({uId : curUser.uId}, props.jwt.secret, (err, token) => {
                    if(!err){
                        return res.json({success : true, payload : token})
                    } else {
                        return res.json({success: false, payload : err});
                    } 
                   
                })
            } else {
                //if nonexistence user, create as new user in DB 
                let newUser = new UserDoc({
                    uId : UserUtil.generateUID(),
                    uType : req.body.user.uType,
                    publicUID : req.body.user.googleId,
                    publicName : 'GOOGLE',
                    imageUrl : req.body.user.imageUrl,
                    name : req.body.user.name,
                    email : req.body.user.email
                });
                newUser.save().then(resp => {
                    // console.log('New user created in DB : ' + resp);
                    jwt.sign({uId : resp.uId}, props.jwt.secret, (err, token) => {
                        if(!err){
                            return res.json({success : true, payload : token})
                        } else {
                            return res.json({success: false, payload : err});
                        }
                    })
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/signup', (req, res) => {
    let newUser = req.body;
    // console.log(newUser);
    let sqlResult = mysql.validateExistingUserReg(newUser);
    sqlResult.then(d => {
        d.count === 'NOT-EXIST' ? 
        res.json({success: true, payload: 'User existed'}) : res.json({success: true, payload: 'User not exist'})
    })
    
})





module.exports = router;
