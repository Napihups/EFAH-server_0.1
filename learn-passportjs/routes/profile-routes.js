const router = require('express').Router();

const authCheck = (req,res, next)=> {
    if(req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

router.get('/', authCheck, (req, res) => {
    res.send('you are logged in, this your profile - ' + req.user.username)
});


module.exports = router;    