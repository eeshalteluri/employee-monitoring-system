"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasActionAccess = hasActionAccess;
const hasAccess_1 = __importDefault(require("../helpers/hasAccess"));
function hasActionAccess(action) {
    return (req, res, next) => {
        const user = req.user; // from JWT middleware
        const resource = req.resource || {};
        if (!(0, hasAccess_1.default)(user, action, resource)) {
            return res.status(403).json({ error: "Access denied (ABAC)" });
        }
        next();
    };
}
//# sourceMappingURL=abac.js.map