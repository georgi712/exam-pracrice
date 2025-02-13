import { Router } from "express";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import authService from "../services/auth-service.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        const latestDevices = await deviceService.getLatest();
        res.render('home', {pageTitle: 'Home', devices: latestDevices});    
    } catch (err) {
        res.setError('Test error');
    }
});

homeController.get('/about', (req, res) => {
    res.render('about')
});

homeController.get('/profile', isAuth, async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user?.id;
        const devicesOwner = await deviceService.ownerDevices(userId);
        const devicesPreferred = await deviceService.prefferedDevices(userId);

        res.render('profile', {user, devicesOwner, devicesPreferred});
    } catch (err) {
        
    }
    
})

export default homeController;