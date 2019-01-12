const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const props = require('../../configs/properties');
const UserDoc = require('../../models/user');


router.get('/', (req, res) => {
    var decoded;
    let token = req.headers.authorization
    console.log(token);
    if(token === undefined) {
       res.json({success: false, payload : "No Authentication"})
    }else {
        try{
            decoded = jwt.verify(token, props.jwt.secret);
            //get user info from the uid in token
            UserDoc.findOne({uId : decoded.uId}, (err, result) => {
                if(!err){
                    res.json({success: true, payload : result});
                } else {
                    res.json({success : false, payload : err});
                }
            })
        }catch(e){
            return  res.json({success: false, payload : "No Authentication"})
           
        }
    }

})


router.get('/test', (req, res) => {
    let obj = {
        _id : 'jdfvujsvvgf',
        uType : 'STUDENT',
        publicUID : "kdbcoubcaofcbefef",
        publicName : 'GOOGLE',
        avatarUrl: "https://picsum.photos/200/300",
        name : "MUHAMMAD HANAFI YAKUB",
        email : "Napi@gmail.com"
    }
    res.json({success: true, payload : obj})
})

module.exports = router;