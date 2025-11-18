import { Schema } from "mongoose";
export declare const Audit: import("mongoose").Model<{
    timestamp: NativeDate;
    before?: any;
    after?: any;
    collectionName?: string | null;
    reason?: string | null;
    documentId?: import("mongoose").Types.ObjectId | null;
    action?: "delete" | "create" | "update" | null;
    performedBy?: import("mongoose").Types.ObjectId | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    timestamp: NativeDate;
    before?: any;
    after?: any;
    collectionName?: string | null;
    reason?: string | null;
    documentId?: import("mongoose").Types.ObjectId | null;
    action?: "delete" | "create" | "update" | null;
    performedBy?: import("mongoose").Types.ObjectId | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    timestamp: NativeDate;
    before?: any;
    after?: any;
    collectionName?: string | null;
    reason?: string | null;
    documentId?: import("mongoose").Types.ObjectId | null;
    action?: "delete" | "create" | "update" | null;
    performedBy?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    timestamp: NativeDate;
    before?: any;
    after?: any;
    collectionName?: string | null;
    reason?: string | null;
    documentId?: import("mongoose").Types.ObjectId | null;
    action?: "delete" | "create" | "update" | null;
    performedBy?: import("mongoose").Types.ObjectId | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    timestamp: NativeDate;
    before?: any;
    after?: any;
    collectionName?: string | null;
    reason?: string | null;
    documentId?: import("mongoose").Types.ObjectId | null;
    action?: "delete" | "create" | "update" | null;
    performedBy?: import("mongoose").Types.ObjectId | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    timestamp: NativeDate;
    before?: any;
    after?: any;
    collectionName?: string | null;
    reason?: string | null;
    documentId?: import("mongoose").Types.ObjectId | null;
    action?: "delete" | "create" | "update" | null;
    performedBy?: import("mongoose").Types.ObjectId | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export type AuditDocument = typeof Audit.prototype;
//# sourceMappingURL=audit.model.d.ts.map