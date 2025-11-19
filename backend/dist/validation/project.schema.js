"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectSchema = exports.listProjectsSchema = exports.getProjectByIdSchema = exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
exports.createProjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        slug: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        clientId: common_schema_1.objectIdSchema,
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        projectType: zod_1.z.string().optional(),
        priority: zod_1.z.enum(["low", "medium", "high", "critical"]).optional(),
        estimatedHours: zod_1.z.number().optional(),
        startDate: zod_1.z.coerce.date().optional(),
        endDate: zod_1.z.coerce.date().optional(),
        status: zod_1.z
            .enum(["planned", "active", "on-hold", "completed", "cancelled"])
            .optional(),
        assignments: zod_1.z
            .object({
            leadAssignee: common_schema_1.objectIdSchema.optional(),
            virtualAssistant: common_schema_1.objectIdSchema.optional(),
            freelancers: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
            coders: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
        })
            .optional(),
        links: zod_1.z
            .object({
            github: zod_1.z.string().optional(),
            onedrive: zod_1.z.string().optional(),
            loom: zod_1.z.string().optional(),
            whatsapp: zod_1.z.string().optional(),
        })
            .partial()
            .optional(),
        milestones: zod_1.z
            .array(zod_1.z.object({
            title: zod_1.z.string(),
            dueDate: zod_1.z.coerce.date().optional(),
            status: zod_1.z.string().optional(),
        }))
            .optional(),
        lifecycle: zod_1.z
            .array(zod_1.z.object({
            state: zod_1.z.string(),
            changedAt: zod_1.z.coerce.date().optional(),
            by: common_schema_1.objectIdSchema.optional(),
        }))
            .optional(),
        meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    }),
});
exports.updateProjectSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
    body: zod_1.z
        .object({
        title: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        clientId: common_schema_1.objectIdSchema.optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        projectType: zod_1.z.string().optional(),
        priority: zod_1.z.enum(["low", "medium", "high", "critical"]).optional(),
        estimatedHours: zod_1.z.number().optional(),
        startDate: zod_1.z.coerce.date().optional(),
        endDate: zod_1.z.coerce.date().optional(),
        status: zod_1.z
            .enum(["planned", "active", "on-hold", "completed", "cancelled"])
            .optional(),
        assignments: zod_1.z
            .object({
            leadAssignee: common_schema_1.objectIdSchema.optional(),
            virtualAssistant: common_schema_1.objectIdSchema.optional(),
            freelancers: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
            coders: zod_1.z.array(common_schema_1.objectIdSchema).optional(),
        })
            .optional(),
        links: zod_1.z
            .object({
            github: zod_1.z.string().optional(),
            onedrive: zod_1.z.string().optional(),
            loom: zod_1.z.string().optional(),
            whatsapp: zod_1.z.string().optional(),
        })
            .partial()
            .optional(),
        milestones: zod_1.z
            .array(zod_1.z.object({
            title: zod_1.z.string(),
            dueDate: zod_1.z.coerce.date().optional(),
            status: zod_1.z.string().optional(),
        }))
            .optional(),
        lifecycle: zod_1.z
            .array(zod_1.z.object({
            state: zod_1.z.string(),
            changedAt: zod_1.z.coerce.date().optional(),
            by: common_schema_1.objectIdSchema.optional(),
        }))
            .optional(),
        meta: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    })
        .strict(),
});
exports.getProjectByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
exports.listProjectsSchema = zod_1.z.object({
    query: common_schema_1.paginationQuerySchema,
});
exports.deleteProjectSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
//# sourceMappingURL=project.schema.js.map