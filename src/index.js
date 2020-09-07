const express = require('express')
const app = express()
const authRouter = require('../routes/auth')
const mongoose = require('mongoose')
require('dotenv').config()
const adminRouter = require('../routes/admin')

app.use(express.json())

const uri = process.env.DB_URL
mongoose.connect(uri, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
const connection = mongoose.connection
connection.once('open', ()=> {
    console.log('MongoDB connection successful')
})
app.use('/api',authRouter)
app.use('/admin',adminRouter)
app.get('/',(req,res) => {
    res.send('Welcome to the authentication API built with JWT. API endpoints are /api/register, /api/login, /admin')
})



app.listen(3000, ()=> console.log('server started successfully on port 3000'))