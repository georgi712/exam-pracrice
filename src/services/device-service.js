import Device from "../models/Devices.js";

const deviceService = {
    getAll() {
        return Device.find({});
    }
};

export default deviceService;