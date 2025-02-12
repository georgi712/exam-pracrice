import { Router } from "express";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

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

export default homeController;