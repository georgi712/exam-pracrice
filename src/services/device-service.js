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
    },
    update(deviceData, deviceId) {
        return Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });
    },
    delete(deviceId) {
        return Device.findByIdAndDelete(deviceId);
    },
    addToPreferList(deviceId, userId) {
        return Device.findByIdAndUpdate(deviceId, {
            $push: {
                preferredList: userId,
            }
        })
    }
};

export default deviceService;