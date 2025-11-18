"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSchema = exports.listUsersSchema = exports.getUserByIdSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
// src/validation/user.schema.ts
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
// --------------------------------------
// Base User Fields Schema
// --------------------------------------
const userBaseFields = {
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    emailVerified: zod_1.z.boolean().default(false),
    role: zod_1.z.enum(["admin", "employee", "client", "applicant"]),
    phone: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
    // Zod v4: record(valueType)
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    isActive: zod_1.z.boolean().optional(),
    assignedClientIds: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
};
// --------------------------------------
// CREATE USER
// --------------------------------------
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        ...userBaseFields,
    })
        .strict(),
});
// --------------------------------------
// UPDATE USER
// --------------------------------------
exports.updateUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(1).optional(),
        email: zod_1.z.string().email().optional(),
        emailVerified: zod_1.z.boolean().optional(),
        role: zod_1.z.enum(["admin", "employee", "client", "applicant"]).optional(),
        phone: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
        // Zod v4: record(valueType)
        metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
        isActive: zod_1.z.boolean().optional(),
        assignedClientIds: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
    })
        .strict(), // disallow extra fields in update
});
// --------------------------------------
// GET USER BY ID
// --------------------------------------
exports.getUserByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
// --------------------------------------
// LIST USERS
// --------------------------------------
exports.listUsersSchema = zod_1.z.object({
    query: common_schema_1.paginationQuerySchema.strict(),
});
// --------------------------------------
// DELETE USER
// --------------------------------------
exports.deleteUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
//# sourceMappingURL=user.schema.js.map