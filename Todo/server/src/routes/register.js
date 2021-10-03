const router    = require('express').Router()

const isLogin = require('../middlewere/auth')
const Todo = require('../models/TodoModel')
const authControllers = require('../controllers/auth')


//signup - post
router.route("/registor").post(authControllers.signUp)


//login - post
router.route('/login').post(authControllers.login)



module.exports = router;