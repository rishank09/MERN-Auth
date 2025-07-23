import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // ✅ Don't assign to req.body — assign to req.user instead (standard practice)
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};



export default userAuth;