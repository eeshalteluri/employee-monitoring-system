import { Schema } from "mongoose";
export declare const Client: import("mongoose").Model<{
    name: string;
    tags: string[];
    type?: string | null;
    notes?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    createdBy?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    tags: string[];
    type?: string | null;
    notes?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    createdBy?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    tags: string[];
    type?: string | null;
    notes?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    createdBy?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    tags: string[];
    type?: string | null;
    notes?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    createdBy?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    tags: string[];
    type?: string | null;
    notes?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    createdBy?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    name: string;
    tags: string[];
    type?: string | null;
    notes?: string | null;
    contactName?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    createdBy?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export type ClientDocument = typeof Client.prototype;
//# sourceMappingURL=client.model.d.ts.map