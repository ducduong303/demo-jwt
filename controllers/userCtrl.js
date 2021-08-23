const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const APIfeatures = require('../utils/APIfeatures');

const userCtrl = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const user = await Users.findOne({ email: email })
            if (user) return res.status(400).json({ msg: "Email đã được đăng ký" })

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            await newUser.save()
            res.json({ msg: "Đăng ký tài khoản thành công" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email: email })
            if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại !" })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không chính xác !" })

            // if login success create token
            const payload = { id: user._id, name: user.username }
            let access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" })
            let refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
            const userInfo = {
                avatar: user.avatar,
                createdAt: user.createdAt,
                email: user.email,
                role: user.role,
                updatedAt: user.updatedAt,
                username: user.username
            }
            res.json({
                userInfo,
                access_token,
                refresh_token,
                msg: "Đăng nhập thành công",
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            // const token = req.header("Authorization")
            const refreshToken = req.body.token;
            // console.log(refreshToken);
            if (!refreshToken) return res.send({ msg: "Người dùng chưa đăng nhập" })

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                // if (err) return res.send(false)

                if (err) return res.status(403).json({ msg: "Người dùng chưa đăng nhập" })
                // console.log("user", user);
                const payload = { id: user.id, name: user.name }
                const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllUser: async (req, res) => {
        try {
            const apiFeatures = new APIfeatures(Users.find(), req.query)
                .pagination()

            const user = await apiFeatures.query
            const totalItem = await Users.find()
            res.json({
                user,
                totalItem: totalItem.length
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },




}


module.exports = userCtrl