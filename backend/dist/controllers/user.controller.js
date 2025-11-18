"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const createUser = async (req, res) => {
    try {
        const { body } = req.validated;
        const user = await user_model_1.UserModel.create(body);
        return res.status(201).json(user);
    }
    catch (err) {
        console.error("createUser error:", err);
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email already in use" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const { query } = req.validated || {};
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            user_model_1.UserModel.find().skip(skip).limit(limit),
            user_model_1.UserModel.countDocuments(),
        ]);
        return res.json({
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (err) {
        console.error("getUsers error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { params } = req.validated;
        const user = await user_model_1.UserModel.findById(params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.json(user);
    }
    catch (err) {
        console.error("getUserById error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { params, body } = req.validated;
        const user = await user_model_1.UserModel.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.json(user);
    }
    catch (err) {
        console.error("updateUser error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { params } = req.validated;
        const user = await user_model_1.UserModel.findByIdAndDelete(params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(204).send();
    }
    catch (err) {
        console.error("deleteUser error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map