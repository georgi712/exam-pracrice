import { Router } from "express";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const devicesController = Router();

devicesController.get('/catalog', async (req, res) => {
    try {
        const devices = await deviceService.getAll();
        res.render('devices/catalog', { devices });
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', { error });
    } 
});

devicesController.get('/create', (req, res) => {
    res.render('devices/create');
});

devicesController.post('/create', async (req, res) => {
    const newDevice = req.body;
    
    try {
        const userId = req.user?.id;
        await deviceService.create(newDevice, userId);
        res.redirect('/devices/catalog');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('devices/create', { error, device: newDevice });
    }
});

export default devicesController;