import { z } from "zod";
export declare const createFileSchema: z.ZodObject<{
    body: z.ZodObject<{
        filename: z.ZodString;
        fileType: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodNumber>;
        pathKey: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        uploaderId: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateFileSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        filename: z.ZodOptional<z.ZodString>;
        fileType: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodNumber>;
        pathKey: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        uploaderId: z.ZodOptional<z.ZodString>;
        projectId: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const getFileByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listFilesSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteFileSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=file.schema.d.ts.map