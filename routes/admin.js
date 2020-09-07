const router = require('express').Router()
const verify = require('./verifyRoutes')


router.route('/').get(verify,(req,res) => {
    res.send('you are in the admin area')
})

module.exports = router