import { Router } from "express";
import homeController from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";
import devicesController from "./controllers/devices-controller.js";

const router = Router();

router.use(homeController);
router.use('/auth', authController);
router.use('/devices', devicesController);

router.get('*', (req, res) => {
    res.render('404');
})

export default router;