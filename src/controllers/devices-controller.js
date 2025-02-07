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
    
})

export default devicesController;