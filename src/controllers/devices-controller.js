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

devicesController.get('/:deviceId/details', async(req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await deviceService.getOne(deviceId);
        const user = req.user;
        const isOwner = device.owner?.toString() === req.user?.id;
        const isPreferd = false;

        device.peffereList.forEach((id) => {
            if (id.toString() === req.user?.id) {
                isPreferd = true;
            }
        });

        res.render('devices/details', { device, user, isOwner, isPreferd })
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', {error});
    }

});

devicesController.get('/:deviceId/edit', async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await deviceService.getOne(deviceId);
        res.render('devices/edit', {device})
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', {error});
    }
});

devicesController.post('/:deviceId/edit', async (req, res) => {
    const deviceData = req.body;
    const deviceId = req.params.deviceId;

    try {
        await deviceService.update(deviceData, deviceId);

        // TODO: Fields errors

        res.redirect(`/devices/${deviceId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('devices/edit', { error, device: deviceData });
    }
});

devicesController.get('/:deviceId/delete', async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await deviceService.delete(deviceId);
        res.redirect('/devices/catalog');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', {error});
    }
});

export default devicesController;