"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compareValues_1 = __importDefault(require("./compareValues"));
const getValue_1 = __importDefault(require("./getValue"));
function evaluateRule(rule, ctx) {
    if (rule.all) {
        return rule.all.every((r) => evaluateRule(r, ctx));
    }
    if (rule.any) {
        return rule.any.some((r) => evaluateRule(r, ctx));
    }
    if (rule.not) {
        return !evaluateRule(rule.not, ctx);
    }
    // --- Extract key safely ---
    const keys = Object.keys(rule);
    if (keys.length === 0)
        throw new Error("Invalid rule: empty object");
    const key = keys[0];
    const condition = rule[key];
    if (typeof condition !== "object" || condition === null) {
        throw new Error(`Invalid condition for key '${key}'`);
    }
    // --- Extract operator safely ---
    const opKeys = Object.keys(condition);
    if (opKeys.length === 0)
        throw new Error(`No operator for key '${key}'`);
    const operator = opKeys[0];
    const rightValue = condition[operator];
    const leftValue = (0, getValue_1.default)(ctx, key);
    const resolvedRight = typeof rightValue === "string" && rightValue.startsWith("resource.")
        ? (0, getValue_1.default)(ctx, rightValue)
        : rightValue;
    return (0, compareValues_1.default)(operator, leftValue, resolvedRight);
}
exports.default = evaluateRule;
//# sourceMappingURL=evaluteRule.js.map