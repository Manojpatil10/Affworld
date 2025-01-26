const express = require("express");
const router = express.Router();

const authUser = require('../Middleware/authenticateUser').authenticateUser;
const signup = require('../Controller/signup').signup;
const login = require('../Controller/login').login;
const getUser = require('../Controller/getUser').getUser;
const addTask = require('../Controller/addTask').addTask;
const addPost = require('../Controller/addPost').addPost;
const myTask = require('../Controller/myTask').myTask;
const updateTask = require('../Controller/updateTask').updateTask;
const deleteTask = require('../Controller/deleteTask').deteteTask;
const feedPost = require('../Controller/feedPost').feedPost;
const forgetPass = require('../Controller/forgetPass').forgotPass;
const updatePass = require('../Controller/updatePass').updatePass;

router.post('/signup', signup)
router.post('/login', login)
router.post('/getUser', authUser, getUser)
router.post('/addTask', authUser, addTask)
router.post('/addPost', authUser, addPost)
router.get('/myTask', authUser, myTask)
router.post('/updateTask', updateTask)
router.delete('/deteteTask/:id', deleteTask)
router.get('/feedPost', feedPost)
router.post('/forgrtPass', forgetPass)
router.post('/updatePass', updatePass)

module.exports = router;