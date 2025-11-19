import { z } from "zod";
export declare const createAuditSchema: z.ZodObject<{
    body: z.ZodObject<{
        collectionName: z.ZodString;
        documentId: z.ZodString;
        action: z.ZodEnum<{
            delete: "delete";
            create: "create";
            update: "update";
        }>;
        performedBy: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        before: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        after: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateAuditSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        collectionName: z.ZodOptional<z.ZodString>;
        documentId: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodEnum<{
            delete: "delete";
            create: "create";
            update: "update";
        }>>;
        performedBy: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        before: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        after: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const getAuditByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listAuditsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteAuditSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=audit.schema.d.ts.map