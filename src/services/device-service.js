import Device from "../models/Devices.js";

const deviceService = {
    getAll() {
        return Device.find({});
    },
    getLatest() {
        return Device.find().sort({ _id: -1 }).limit(3);
    },
    create(deviceData, ownerId) {
        const result = Device.create({
            ...deviceData,
            owner: ownerId
        });
        return result;
    },
    getOne(deviceId) {
        return Device.findById(deviceId)
    }
};

export default deviceService;