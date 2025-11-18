import { Schema } from "mongoose";
export declare const Project: import("mongoose").Model<{
    title: string;
    tags: string[];
    clientId: import("mongoose").Types.ObjectId;
    priority: "low" | "medium" | "high" | "critical";
    status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
    milestones: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }> & {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }>;
    lifecycle: import("mongoose").Types.DocumentArray<{
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }> & {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }>;
    description?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    projectType?: string | null;
    estimatedHours?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    slug?: string | null;
    assignments?: {
        freelancers: import("mongoose").Types.ObjectId[];
        coders: import("mongoose").Types.ObjectId[];
        leadAssignee?: import("mongoose").Types.ObjectId | null;
        virtualAssistant?: import("mongoose").Types.ObjectId | null;
    } | null;
    meta?: any;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    title: string;
    tags: string[];
    clientId: import("mongoose").Types.ObjectId;
    priority: "low" | "medium" | "high" | "critical";
    status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
    milestones: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }> & {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }>;
    lifecycle: import("mongoose").Types.DocumentArray<{
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }> & {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }>;
    description?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    projectType?: string | null;
    estimatedHours?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    slug?: string | null;
    assignments?: {
        freelancers: import("mongoose").Types.ObjectId[];
        coders: import("mongoose").Types.ObjectId[];
        leadAssignee?: import("mongoose").Types.ObjectId | null;
        virtualAssistant?: import("mongoose").Types.ObjectId | null;
    } | null;
    meta?: any;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    title: string;
    tags: string[];
    clientId: import("mongoose").Types.ObjectId;
    priority: "low" | "medium" | "high" | "critical";
    status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
    milestones: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }> & {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }>;
    lifecycle: import("mongoose").Types.DocumentArray<{
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }> & {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }>;
    description?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    projectType?: string | null;
    estimatedHours?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    slug?: string | null;
    assignments?: {
        freelancers: import("mongoose").Types.ObjectId[];
        coders: import("mongoose").Types.ObjectId[];
        leadAssignee?: import("mongoose").Types.ObjectId | null;
        virtualAssistant?: import("mongoose").Types.ObjectId | null;
    } | null;
    meta?: any;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    tags: string[];
    clientId: import("mongoose").Types.ObjectId;
    priority: "low" | "medium" | "high" | "critical";
    status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
    milestones: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }> & {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }>;
    lifecycle: import("mongoose").Types.DocumentArray<{
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }> & {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }>;
    description?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    projectType?: string | null;
    estimatedHours?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    slug?: string | null;
    assignments?: {
        freelancers: import("mongoose").Types.ObjectId[];
        coders: import("mongoose").Types.ObjectId[];
        leadAssignee?: import("mongoose").Types.ObjectId | null;
        virtualAssistant?: import("mongoose").Types.ObjectId | null;
    } | null;
    meta?: any;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    tags: string[];
    clientId: import("mongoose").Types.ObjectId;
    priority: "low" | "medium" | "high" | "critical";
    status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
    milestones: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }> & {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }>;
    lifecycle: import("mongoose").Types.DocumentArray<{
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }> & {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }>;
    description?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    projectType?: string | null;
    estimatedHours?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    slug?: string | null;
    assignments?: {
        freelancers: import("mongoose").Types.ObjectId[];
        coders: import("mongoose").Types.ObjectId[];
        leadAssignee?: import("mongoose").Types.ObjectId | null;
        virtualAssistant?: import("mongoose").Types.ObjectId | null;
    } | null;
    meta?: any;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    title: string;
    tags: string[];
    clientId: import("mongoose").Types.ObjectId;
    priority: "low" | "medium" | "high" | "critical";
    status: "planned" | "active" | "on-hold" | "completed" | "cancelled";
    milestones: import("mongoose").Types.DocumentArray<{
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }> & {
        title?: string | null;
        status?: string | null;
        dueDate?: NativeDate | null;
    }>;
    lifecycle: import("mongoose").Types.DocumentArray<{
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }> & {
        state?: string | null;
        changedAt?: NativeDate | null;
        by?: import("mongoose").Types.ObjectId | null;
    }>;
    description?: string | null;
    links?: {
        github?: string | null;
        onedrive?: string | null;
        loom?: string | null;
        whatsapp?: string | null;
    } | null;
    projectType?: string | null;
    estimatedHours?: number | null;
    startDate?: NativeDate | null;
    endDate?: NativeDate | null;
    slug?: string | null;
    assignments?: {
        freelancers: import("mongoose").Types.ObjectId[];
        coders: import("mongoose").Types.ObjectId[];
        leadAssignee?: import("mongoose").Types.ObjectId | null;
        virtualAssistant?: import("mongoose").Types.ObjectId | null;
    } | null;
    meta?: any;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export type ProjectDocument = typeof Project.prototype;
//# sourceMappingURL=project.model.d.ts.map