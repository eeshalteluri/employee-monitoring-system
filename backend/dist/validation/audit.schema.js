"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuditSchema = exports.listAuditsSchema = exports.getAuditByIdSchema = exports.updateAuditSchema = exports.createAuditSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
exports.createAuditSchema = zod_1.z.object({
    body: zod_1.z.object({
        collectionName: zod_1.z.string(),
        documentId: common_schema_1.objectIdSchema,
        action: zod_1.z.enum(["create", "update", "delete"]),
        performedBy: common_schema_1.objectIdSchema.optional(),
        timestamp: zod_1.z.coerce.date().optional(),
        before: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
        after: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
        reason: zod_1.z.string().optional(),
    }),
});
exports.updateAuditSchema = zod_1.z.object({
    params: zod_1.z.object({ id: common_schema_1.objectIdSchema }),
    body: zod_1.z
        .object({
        collectionName: zod_1.z.string().optional(),
        documentId: common_schema_1.objectIdSchema.optional(),
        action: zod_1.z.enum(["create", "update", "delete"]).optional(),
        performedBy: common_schema_1.objectIdSchema.optional(),
        timestamp: zod_1.z.coerce.date().optional(),
        before: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
        after: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
        reason: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.getAuditByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
exports.listAuditsSchema = zod_1.z.object({
    query: common_schema_1.paginationQuerySchema,
});
exports.deleteAuditSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
//# sourceMappingURL=audit.schema.js.map