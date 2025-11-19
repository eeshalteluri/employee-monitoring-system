import { Schema } from "mongoose";
export declare const Update: import("mongoose").Model<{
    type: "daily" | "training" | "note";
    date: NativeDate;
    projectId: import("mongoose").Types.ObjectId;
    authorId: import("mongoose").Types.ObjectId;
    checklist: import("mongoose").Types.DocumentArray<{
        text?: string | null;
        checked?: boolean | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        text?: string | null;
        checked?: boolean | null;
    }> & {
        text?: string | null;
        checked?: boolean | null;
    }>;
    attachments: import("mongoose").Types.ObjectId[];
    visibleToClient: boolean;
    meta?: any;
    summary?: string | null;
    nextPlan?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    type: "daily" | "training" | "note";
    date: NativeDate;
    projectId: import("mongoose").Types.ObjectId;
    authorId: import("mongoose").Types.ObjectId;
    checklist: import("mongoose").Types.DocumentArray<{
        text?: string | null;
        checked?: boolean | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        text?: string | null;
        checked?: boolean | null;
    }> & {
        text?: string | null;
        checked?: boolean | null;
    }>;
    attachments: import("mongoose").Types.ObjectId[];
    visibleToClient: boolean;
    meta?: any;
    summary?: string | null;
    nextPlan?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    type: "daily" | "training" | "note";
    date: NativeDate;
    projectId: import("mongoose").Types.ObjectId;
    authorId: import("mongoose").Types.ObjectId;
    checklist: import("mongoose").Types.DocumentArray<{
        text?: string | null;
        checked?: boolean | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        text?: string | null;
        checked?: boolean | null;
    }> & {
        text?: string | null;
        checked?: boolean | null;
    }>;
    attachments: import("mongoose").Types.ObjectId[];
    visibleToClient: boolean;
    meta?: any;
    summary?: string | null;
    nextPlan?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "daily" | "training" | "note";
    date: NativeDate;
    projectId: import("mongoose").Types.ObjectId;
    authorId: import("mongoose").Types.ObjectId;
    checklist: import("mongoose").Types.DocumentArray<{
        text?: string | null;
        checked?: boolean | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        text?: string | null;
        checked?: boolean | null;
    }> & {
        text?: string | null;
        checked?: boolean | null;
    }>;
    attachments: import("mongoose").Types.ObjectId[];
    visibleToClient: boolean;
    meta?: any;
    summary?: string | null;
    nextPlan?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    type: "daily" | "training" | "note";
    date: NativeDate;
    projectId: import("mongoose").Types.ObjectId;
    authorId: import("mongoose").Types.ObjectId;
    checklist: import("mongoose").Types.DocumentArray<{
        text?: string | null;
        checked?: boolean | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        text?: string | null;
        checked?: boolean | null;
    }> & {
        text?: string | null;
        checked?: boolean | null;
    }>;
    attachments: import("mongoose").Types.ObjectId[];
    visibleToClient: boolean;
    meta?: any;
    summary?: string | null;
    nextPlan?: string | null;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    type: "daily" | "training" | "note";
    date: NativeDate;
    projectId: import("mongoose").Types.ObjectId;
    authorId: import("mongoose").Types.ObjectId;
    checklist: import("mongoose").Types.DocumentArray<{
        text?: string | null;
        checked?: boolean | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        text?: string | null;
        checked?: boolean | null;
    }> & {
        text?: string | null;
        checked?: boolean | null;
    }>;
    attachments: import("mongoose").Types.ObjectId[];
    visibleToClient: boolean;
    meta?: any;
    summary?: string | null;
    nextPlan?: string | null;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export type UpdateDocument = typeof Update.prototype;
//# sourceMappingURL=updates.model.d.ts.map