"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientSchema = exports.listClientsSchema = exports.getClientByIdSchema = exports.updateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
const common_schema_1 = require("./common.schema");
exports.createClientSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        type: zod_1.z.string().optional(),
        contactName: zod_1.z.string().optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactPhone: zod_1.z.string().optional(),
        links: zod_1.z
            .object({
            github: zod_1.z.string().url().optional(),
            onedrive: zod_1.z.string().url().optional(),
            loom: zod_1.z.string().url().optional(),
            whatsapp: zod_1.z.string().optional(),
        })
            .partial()
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        notes: zod_1.z.string().optional(),
        createdBy: common_schema_1.objectIdSchema.optional(),
    }),
});
exports.updateClientSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        contactName: zod_1.z.string().optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactPhone: zod_1.z.string().optional(),
        links: zod_1.z
            .object({
            github: zod_1.z.string().url().optional(),
            onedrive: zod_1.z.string().url().optional(),
            loom: zod_1.z.string().url().optional(),
            whatsapp: zod_1.z.string().optional(),
        })
            .partial()
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        notes: zod_1.z.string().optional(),
        createdBy: common_schema_1.objectIdSchema.optional(),
    })
        .strict(),
});
exports.getClientByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
exports.listClientsSchema = zod_1.z.object({
    query: common_schema_1.paginationQuerySchema,
});
exports.deleteClientSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: common_schema_1.objectIdSchema,
    }),
});
//# sourceMappingURL=client.schema.js.map