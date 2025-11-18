import { z } from "zod";
export declare const createProjectSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        slug: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        clientId: z.ZodString;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        projectType: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
            critical: "critical";
        }>>;
        estimatedHours: z.ZodOptional<z.ZodNumber>;
        startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        status: z.ZodOptional<z.ZodEnum<{
            planned: "planned";
            active: "active";
            "on-hold": "on-hold";
            completed: "completed";
            cancelled: "cancelled";
        }>>;
        assignments: z.ZodOptional<z.ZodObject<{
            leadAssignee: z.ZodOptional<z.ZodString>;
            virtualAssistant: z.ZodOptional<z.ZodString>;
            freelancers: z.ZodOptional<z.ZodArray<z.ZodString>>;
            coders: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>;
        links: z.ZodOptional<z.ZodObject<{
            github: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            onedrive: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            loom: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            whatsapp: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>>;
        milestones: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
            status: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        lifecycle: z.ZodOptional<z.ZodArray<z.ZodObject<{
            state: z.ZodString;
            changedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
            by: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        clientId: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        projectType: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
            critical: "critical";
        }>>;
        estimatedHours: z.ZodOptional<z.ZodNumber>;
        startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        status: z.ZodOptional<z.ZodEnum<{
            planned: "planned";
            active: "active";
            "on-hold": "on-hold";
            completed: "completed";
            cancelled: "cancelled";
        }>>;
        assignments: z.ZodOptional<z.ZodObject<{
            leadAssignee: z.ZodOptional<z.ZodString>;
            virtualAssistant: z.ZodOptional<z.ZodString>;
            freelancers: z.ZodOptional<z.ZodArray<z.ZodString>>;
            coders: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>;
        links: z.ZodOptional<z.ZodObject<{
            github: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            onedrive: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            loom: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            whatsapp: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>>;
        milestones: z.ZodOptional<z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
            status: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        lifecycle: z.ZodOptional<z.ZodArray<z.ZodObject<{
            state: z.ZodString;
            changedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
            by: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const getProjectByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listProjectsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=project.schema.d.ts.map