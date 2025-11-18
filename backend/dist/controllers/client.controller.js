"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = void 0;
const client_model_1 = require("../models/client.model");
const createClient = async (req, res) => {
    try {
        const { body } = req.validated;
        const client = await client_model_1.Client.create(body);
        return res.status(201).json(client);
    }
    catch (err) {
        console.error("createClient error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createClient = createClient;
const getClients = async (req, res) => {
    try {
        const { query } = req.validated || {};
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            client_model_1.Client.find().skip(skip).limit(limit),
            client_model_1.Client.countDocuments(),
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
        console.error("getClients error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getClients = getClients;
const getClientById = async (req, res) => {
    try {
        const { params } = req.validated;
        const item = await client_model_1.Client.findById(params.id);
        if (!item)
            return res.status(404).json({ message: "Client not found" });
        return res.json(item);
    }
    catch (err) {
        console.error("getClientById error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getClientById = getClientById;
const updateClient = async (req, res) => {
    try {
        const { params, body } = req.validated;
        const item = await client_model_1.Client.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!item)
            return res.status(404).json({ message: "Client not found" });
        return res.json(item);
    }
    catch (err) {
        console.error("updateClient error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    try {
        const { params } = req.validated;
        const deleted = await client_model_1.Client.findByIdAndDelete(params.id);
        if (!deleted)
            return res.status(404).json({ message: "Client not found" });
        return res.status(204).send();
    }
    catch (err) {
        console.error("deleteClient error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteClient = deleteClient;
//# sourceMappingURL=client.controller.js.map