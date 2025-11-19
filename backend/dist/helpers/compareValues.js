"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareValues(operator, left, right) {
    switch (operator) {
        case "eq": return left === right;
        case "neq": return left !== right;
        case "gt": return left > right;
        case "gte": return left >= right;
        case "lt": return left < right;
        case "lte": return left <= right;
        case "in": return Array.isArray(right) && right.includes(left);
        case "not_in": return Array.isArray(right) && !right.includes(left);
        default: return false;
    }
}
exports.default = compareValues;
//# sourceMappingURL=compareValues.js.map