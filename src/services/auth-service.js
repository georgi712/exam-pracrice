import User from '../models/User.js';

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
    }
}

export default authService;