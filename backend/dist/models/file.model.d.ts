import { Schema } from "mongoose";
export declare const FileModel: import("mongoose").Model<{
    uploadedAt: NativeDate;
    meta?: any;
    projectId?: import("mongoose").Types.ObjectId | null;
    filename?: string | null;
    fileType?: string | null;
    size?: number | null;
    pathKey?: string | null;
    url?: string | null;
    uploaderId?: import("mongoose").Types.ObjectId | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    uploadedAt: NativeDate;
    meta?: any;
    projectId?: import("mongoose").Types.ObjectId | null;
    filename?: string | null;
    fileType?: string | null;
    size?: number | null;
    pathKey?: string | null;
    url?: string | null;
    uploaderId?: import("mongoose").Types.ObjectId | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    uploadedAt: NativeDate;
    meta?: any;
    projectId?: import("mongoose").Types.ObjectId | null;
    filename?: string | null;
    fileType?: string | null;
    size?: number | null;
    pathKey?: string | null;
    url?: string | null;
    uploaderId?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    uploadedAt: NativeDate;
    meta?: any;
    projectId?: import("mongoose").Types.ObjectId | null;
    filename?: string | null;
    fileType?: string | null;
    size?: number | null;
    pathKey?: string | null;
    url?: string | null;
    uploaderId?: import("mongoose").Types.ObjectId | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    uploadedAt: NativeDate;
    meta?: any;
    projectId?: import("mongoose").Types.ObjectId | null;
    filename?: string | null;
    fileType?: string | null;
    size?: number | null;
    pathKey?: string | null;
    url?: string | null;
    uploaderId?: import("mongoose").Types.ObjectId | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    uploadedAt: NativeDate;
    meta?: any;
    projectId?: import("mongoose").Types.ObjectId | null;
    filename?: string | null;
    fileType?: string | null;
    size?: number | null;
    pathKey?: string | null;
    url?: string | null;
    uploaderId?: import("mongoose").Types.ObjectId | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export type FileDocument = typeof FileModel.prototype;
//# sourceMappingURL=file.model.d.ts.map