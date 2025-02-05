import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const authService = {
    async register(userData) {
        
        if (userData.password !== userData.rePassword) {
            throw new Error('Password mismatch!')
        }

        const user = await User.findOne({email: userData.email}).select({_id: 1});
        if (user) {
            throw new Error('User alredy exists!');
        }

       return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password!');
        };

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        const token  = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
    }
}

export default authService;