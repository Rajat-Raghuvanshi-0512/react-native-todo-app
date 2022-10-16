const jwt = require('jsonwebtoken');
const User = require('../Database/models/UserSchema');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: "No token provided" })
        }

        const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
        if (!verifytoken) {
            return res.status(401).json({ error: "Invalid token" })
        }

        const rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });
        req.UserId = rootUser._id;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token or no token provided" })
    }
}

module.exports = Authenticate;