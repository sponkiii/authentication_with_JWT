const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
    res.json({
        posts: {
            title: 'my first post', 
            description: 'random data you shouldn\'t access'
        }

    });

});


// to export this on other files
module.exports = router;