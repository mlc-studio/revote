import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

export default class AuthController {
    static async register(req, res) {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Please enter all fields'
            });
        }

        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
        if (username.length < 3) return res.status(400).json({ message: 'Username must be at least 3 characters' });
        if (username.length > 20) return res.status(400).json({ message: 'Username must be at most 20 characters' });

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email' });

        try {
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    message: 'User already exists'
                });
            }

            const newUser = new User({
                username,
                email,
                encryptedPassword: bcrypt.hashSync(password, 10),
            });

            await newUser.save();

            return res.status(201).json({
                message: 'User created successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error'
            });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter all fields'
            });
        }

        try {
            const user = await User.findOne({
                email,
            });

            if (!user) return res.status(400).json({ message: 'User does not exist' });

            const isMatch = bcrypt.compareSync(password, user.encryptedPassword);

            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' }); 

            const payload = { id: user.id, username: user.username, email: user.email };

            await jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                if (err) throw err;
                return res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email }});
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error'
            });
        }
    }

    static async me(req, res) {
        try {
            const user = await User.findById(req.userId).select('-encryptedPassword');
            
            if (!user) return res.status(400).json({ message: 'User does not exist' });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
