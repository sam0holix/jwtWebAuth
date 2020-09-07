const router = require('express').Router()
const UserModel = require('../models/User')
const {loginValidation, registerValidation} = require('../src/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/register').post(async(req,res) =>{
    const error = registerValidation(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const emailExists = await UserModel.findOne({email: req.body.email})
    if(emailExists) return res.status(400).json('Email already exists')

    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(req.body.password,salt)

    const username = req.body.username
    const email = req.body.email
    const password = hashedPass 
    const newUser = new UserModel({username,email,password})

    await newUser.save()
        .then(()=> res.json('User Added'))
        .catch(err => res.status(400).json('Error: '+err))

})

router.route('/login').post(async(req,res) => {
    const error = loginValidation(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    const userExists = await UserModel.findOne({email: req.body.email})
    if(!userExists) return res.status(400).json("Invalid Email or Pasword")
    const validPass = await bcrypt.compare(req.body.password,userExists.password)
    if(!validPass) return res.status(400).json('invalid Email of Password')

    const token = jwt.sign({_id: userExists._id}, process.env.TOKEN_SECRET)
    res.header('auth_token',token).json(token)
})

module.exports = router