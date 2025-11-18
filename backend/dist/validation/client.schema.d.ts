import { z } from "zod";
export declare const createClientSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodOptional<z.ZodString>;
        contactName: z.ZodOptional<z.ZodString>;
        contactEmail: z.ZodOptional<z.ZodString>;
        contactPhone: z.ZodOptional<z.ZodString>;
        links: z.ZodOptional<z.ZodObject<{
            github: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            onedrive: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            loom: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            whatsapp: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        notes: z.ZodOptional<z.ZodString>;
        createdBy: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateClientSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        contactName: z.ZodOptional<z.ZodString>;
        contactEmail: z.ZodOptional<z.ZodString>;
        contactPhone: z.ZodOptional<z.ZodString>;
        links: z.ZodOptional<z.ZodObject<{
            github: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            onedrive: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            loom: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            whatsapp: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        notes: z.ZodOptional<z.ZodString>;
        createdBy: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const getClientByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listClientsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteClientSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=client.schema.d.ts.map