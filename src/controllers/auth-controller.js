import { Router } from "express";
import authService from "../services/auth-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);
        res.cookie('auth', token, {httpOnly: true});
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/register', { error, user: userData })
    }
   
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const token = await authService.login(email, password);
    res.cookie('auth', token, {httpOnly: true});

    res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/login', {
            error,
            user: {email},
        });
    };
    
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;