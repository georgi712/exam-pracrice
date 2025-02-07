import Device from "../models/Devices.js";

const deviceService = {
    getAll() {
        return Device.find({});
    },
    getLatest() {
        return Device.find().sort({ _id: -1 }).limit(3);
    }
};

export default deviceService;