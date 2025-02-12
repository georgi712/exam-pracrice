import { Router } from "express";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";
import { isAuth } from "../middlewares/auth-middleware.js";

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

devicesController.get('/create', isAuth, (req, res) => {
    res.render('devices/create');
});

devicesController.post('/create', isAuth, async (req, res) => {
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
        let isPreferred = false;

        device.preferredList.forEach((id) => {
            if (id.toString() === req.user?.id) {
                return isPreferred = true;
            }
        });

        res.render('devices/details', { device, user, isOwner, isPreferred })
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }

});

devicesController.get('/:deviceId/edit', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;

    const device = await deviceService.getOne(deviceId);
    const user = req.user;
    const isOwner = device.owner?.toString() === req.user?.id;

    if (!isOwner) {
        return res.redirect('/404');
    }

    try {
        const device = await deviceService.getOne(deviceId);
        res.render('devices/edit', {device})
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', {error});
    }
});

devicesController.post('/:deviceId/edit', isAuth, async (req, res) => {
    const deviceData = req.body;
    const deviceId = req.params.deviceId;

    try {
        const device = await deviceService.getOne(deviceId);
        const user = req.user;
        const isOwner = device.owner?.toString() === req.user?.id;
    
        if (!isOwner) {
            res.setError('Is not owner!')
            return res.redirect('/404');
        }

        await deviceService.update(deviceData, deviceId);

        // TODO: Fields errors

        res.redirect(`/devices/${deviceId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('devices/edit', { error, device: deviceData });
    }
});

devicesController.get('/:deviceId/delete', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await deviceService.getOne(deviceId);
        const isOwner = device.owner?.toString() === req.user?.id;

         if (!isOwner) {
            res.setError('Is not owner!')
            return res.redirect('/404');
        }

        const deletedDevice = await deviceService.delete(deviceId);
        res.redirect('/devices/catalog');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('404', {error});
    }
});

devicesController.get('/:deviceId/prefer', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    try {
        const device = await deviceService.getOne(deviceId);
        const isOwner = device.owner?.toString() === userId;
        const isPreferred = device.preferredList.includes(req.user?.id);
        
        if (isOwner) {
            res.setError('Its owner!')
            return res.redirect('/404');
        }

        if (isPreferred) {
            res.setError('Its already prefered!')
            return res.redirect('/404');
        }

        await deviceService.addToPreferList(deviceId, userId);
    } catch (err) {
        res.setError(getErrorMessage(err));
    }
    
    res.redirect(`/devices/${deviceId}/details`);
});

export default devicesController;