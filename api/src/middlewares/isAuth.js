import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        const token = authorization && authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Authorization failed' });

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return res.status(401).json({ message: 'Authorization failed' });

        req.userId = decodedToken.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default isAuth;