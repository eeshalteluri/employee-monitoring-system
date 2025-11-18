import { z } from "zod";
export declare const objectIdSchema: z.ZodString;
export declare const paginationQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=common.schema.d.ts.map