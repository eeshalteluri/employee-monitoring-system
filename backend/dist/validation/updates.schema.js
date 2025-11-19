"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUpdateSchema = exports.listUpdatesSchema = exports.getUpdateByIdSchema = exports.updateUpdateSchema = exports.createUpdateSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
exports.createUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        projectId: common_schema_1.objectIdSchema,
        authorId: common_schema_1.objectIdSchema,
        type: zod_1.z.enum(["daily", "training", "note"]).optional(),
        date: zod_1.z.coerce.date(),
        summary: zod_1.z.string().optional(),
        checklist: zod_1.z
            .array(zod_1.z.object({
            text: zod_1.z.string(),
            checked: zod_1.z.boolean().optional(),
        }))
            .optional(),
        nextPlan: zod_1.z.string().optional(),
        attachments: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
        visibleToClient: zod_1.z.boolean().optional(),
        meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    }),
});
exports.updateUpdateSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
    body: zod_1.z
        .object({
        projectId: common_schema_1.objectIdSchema.optional(),
        authorId: common_schema_1.objectIdSchema.optional(),
        type: zod_1.z.enum(["daily", "training", "note"]).optional(),
        date: zod_1.z.coerce.date().optional(),
        summary: zod_1.z.string().optional(),
        checklist: zod_1.z
            .array(zod_1.z.object({
            text: zod_1.z.string(),
            checked: zod_1.z.boolean().optional(),
        }))
            .optional(),
        nextPlan: zod_1.z.string().optional(),
        attachments: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
        visibleToClient: zod_1.z.boolean().optional(),
        meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    })
        .strict(),
});
exports.getUpdateByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
exports.listUpdatesSchema = zod_1.z.object({
    query: common_schema_1.paginationQuerySchema,
});
exports.deleteUpdateSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
//# sourceMappingURL=updates.schema.js.map