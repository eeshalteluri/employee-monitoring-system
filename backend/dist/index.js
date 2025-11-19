"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
async function start() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        app.listen(5000, () => {
            console.log("Backend running on http://localhost:5000");
        });
    }
    catch (err) {
        console.error("DB Connection Error:", err);
        process.exit(1);
    }
}
start();
// Test route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express backend!" });
});
const PORT = process.env.PORT || 5000;
app.use('/api', routes_1.default);
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map