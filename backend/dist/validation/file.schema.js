"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileSchema = exports.listFilesSchema = exports.getFileByIdSchema = exports.updateFileSchema = exports.createFileSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
exports.createFileSchema = zod_1.z.object({
    body: zod_1.z.object({
        filename: zod_1.z.string(),
        fileType: zod_1.z.string().optional(),
        size: zod_1.z.number().optional(),
        pathKey: zod_1.z.string().optional(),
        url: zod_1.z.string().url().optional(),
        uploaderId: common_schema_1.objectIdSchema.optional(),
        projectId: common_schema_1.objectIdSchema.optional(),
        meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    }),
});
exports.updateFileSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
    body: zod_1.z
        .object({
        filename: zod_1.z.string().optional(),
        fileType: zod_1.z.string().optional(),
        size: zod_1.z.number().optional(),
        pathKey: zod_1.z.string().optional(),
        url: zod_1.z.string().url().optional(),
        uploaderId: common_schema_1.objectIdSchema.optional(),
        projectId: common_schema_1.objectIdSchema.optional(),
        meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    })
        .strict(),
});
exports.getFileByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
exports.listFilesSchema = zod_1.z.object({
    query: common_schema_1.paginationQuerySchema,
});
exports.deleteFileSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
//# sourceMappingURL=file.schema.js.map