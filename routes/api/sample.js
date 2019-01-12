const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    return res.json({
        success: true,
        data : {
            name : "Napi",
            age: 24
        }
    })
})


module.exports = router;

