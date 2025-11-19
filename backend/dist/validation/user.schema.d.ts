import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        emailVerified: z.ZodBoolean;
        role: z.ZodEnum<{
            admin: "admin";
            employee: "employee";
            client: "client";
            applicant: "applicant";
        }>;
        image: z.ZodString;
        isApproved: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        emailVerified: z.ZodOptional<z.ZodBoolean>;
        role: z.ZodOptional<z.ZodEnum<{
            admin: "admin";
            employee: "employee";
            client: "client";
            applicant: "applicant";
        }>>;
        image: z.ZodOptional<z.ZodString>;
        isApproved: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const getUserByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listUsersSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const deleteUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map