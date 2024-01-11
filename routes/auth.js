const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Validation
const { registrationValidation,loginValidation } = require('../validation')


//POST API- Register
router.post('/register', async (req,res)=>{

    // Lets validate the data before we create user
    const {error} = registrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email already exist");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    
    //Create new user
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipcode: req.body.zipcode
    });
    try{
        const savedUser = await user.save();
        res.status(200).json(savedUser);

    }catch(err)
    {
        console.log(err);
    }
});

//POST API-Login
router.post('/login', async (req,res)=>{

    // Lets validate the data before we login user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if email exist in the database
    const userData = await User.findOne({email:req.body.email});
    if(!userData) return res.status(400).send("Email or password is wrong");

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password,userData.password);
    if(!validPass) return res.status(400).send("Invalid password");
    
    //Create and assign token
    const token = jwt.sign({_id:userData._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    
});



module.exports = router;
