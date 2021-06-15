const router = require('express').Router();
const User = require('../model/User');

// Validation
const Joi = require('@hapi/joi');

// sample schema with joi
const schema = Joi.object(
    {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6)
    }
);


// creating our empty router here
router.post('/register', async (req, res) => {

    // Validation DATA before we make a user
        // parameters are the body where we get the data and the schema that we made
        //it's an object so we can actually store it as an object
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    try{
        // here we try to save user
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        // incase we catch an err we respond with this
        res.status(400).send(err);
    }
});




// to export this on other files
module.exports = router;