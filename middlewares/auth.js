const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(401).json({ msg: "Xác thực không hợp lệ" })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({ msg: "Token hết hạn" })
            // if(err.message === "jwt expired") return res.json({
            //     msg:"Token hết hạn"
            // })
            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth