const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin');
// Register User
router.post('/register', userCtrl.registerUser)
// Login User
router.post('/login', userCtrl.loginUser)
// verify Token
router.post('/refresh_token', userCtrl.refreshToken)
// get Alluser
router.get("/all", auth, authAdmin, userCtrl.getAllUser)


module.exports = router