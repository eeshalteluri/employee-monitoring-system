import { z } from "zod";
export declare const createUpdateSchema: z.ZodObject<{
    body: z.ZodObject<{
        projectId: z.ZodString;
        authorId: z.ZodString;
        type: z.ZodOptional<z.ZodEnum<{
            daily: "daily";
            training: "training";
            note: "note";
        }>>;
        date: z.ZodCoercedDate<unknown>;
        summary: z.ZodOptional<z.ZodString>;
        checklist: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            checked: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>>;
        nextPlan: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString>>;
        visibleToClient: z.ZodOptional<z.ZodBoolean>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateUpdateSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        projectId: z.ZodOptional<z.ZodString>;
        authorId: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<{
            daily: "daily";
            training: "training";
            note: "note";
        }>>;
        date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        summary: z.ZodOptional<z.ZodString>;
        checklist: z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            checked: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>>;
        nextPlan: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString>>;
        visibleToClient: z.ZodOptional<z.ZodBoolean>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const getUpdateByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listUpdatesSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteUpdateSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=updates.schema.d.ts.map