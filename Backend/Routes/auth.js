const express = require('express');
const Router = express.Router();
const User = require('../Database/models/UserSchema');
const { body, validationResult, cookie } = require('express-validator');
const bcrypt = require('bcryptjs');
const Authenticate = require('../Middleware/authentication');
//ROUTE 1: Creating a new user
Router.post('/signup', [
    //Adding validation from express-router documentation
    body('name', 'Name is too short').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is too short').isLength({ min: 5 }),
    body('cpassword', 'Password is too short').isLength({ min: 5 })
], async (req, res) => {

    //Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password, cpassword } = req.body;

        //Checking if the user already exists
        if (password !== cpassword) {
            return res.status(400).json({ errors: "Password and Confirm Password must be same " });
        }
        const UserData = await User.findOne({ email });
        if (UserData) {
            return res.status(400).json({ error: "User already exixts" })
        }
        // Creating and adding user to the database
        const user = await User.create({ name, email, password, cpassword })
        if (user) {
            res.json(user);
        }

    } catch (error) {//Checking for unexpected errors
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Login page
Router.post('/login', [

    //Adding validation
    body('email', 'Invalid email').isEmail(),

], async (req, res) => {

    //Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Every field must be filled" })
        }

        const UserData = await User.findOne({ email });
        if (!UserData) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }

        if (await bcrypt.compare(password, UserData.password)) {
            const token = await UserData.generateAuthToken();
            return res.status(200).json(token)
        }
        else {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
    }

})

//ROUTE 3: GetUser
Router.get('/getuser', Authenticate, async (req, res) => {
    try {
        const UserData = await User.findById(req.UserId);
        if (!UserData) {
            return res.status(400).send("User not found");
        }
        res.status(200).json(UserData);
    } catch (error) {
        res.status(400).send("Internal Server error");
    }
})

module.exports = Router;