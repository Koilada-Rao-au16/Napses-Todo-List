const router    = require('express').Router()
const isLogin = require('../middlewere/auth')
const todoControllers = require('../controllers/todo')

//add todo - post
router.route('/add-todo').post(isLogin,todoControllers.addTodo)

//get todos - get
router.route('/get-todo').get(isLogin,todoControllers.getTodo)

//update todo -post
router.route('/update-todo/:id').post(isLogin,todoControllers.updateTodo)

//delete todo - get
router.route('/delete-todo/:id').get(isLogin,todoControllers.deleteTodo)

module.exports = router;