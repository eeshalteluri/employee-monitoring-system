"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const evaluteRule_1 = __importDefault(require("./evaluteRule"));
console.log("Directory Name: ", __dirname);
const policyPath = path_1.default.join(__dirname, "../policies/AllPolicies.json");
const policies = JSON.parse(fs_1.default.readFileSync(policyPath, "utf8"));
function hasAccess(user, action, resource = {}) {
    const rule = policies[action];
    if (!rule)
        return false;
    const context = { user, resource };
    return (0, evaluteRule_1.default)(rule, context);
}
exports.default = hasAccess;
//# sourceMappingURL=hasAccess.js.map