// scripts/generate-postman-collection.ts
// Run: npx ts-node scripts/generate-postman-collection.ts

import fs from "fs";
import path from "path";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UrlObject {
  raw: string;
  host: string[];
  path: string[];
  query?: { key: string; value: string }[];
}

interface SampleBody {
  create: Record<string, any>;
  update: Record<string, any>;
}

interface ResourceConfig {
  folderName: string;
  basePath: string; // e.g. "clients"
  pluralLabel: string; // e.g. "Clients"
  singularLabel: string; // e.g. "Client"
  sampleBody: SampleBody;
}

const collection: any = {
  info: {
    name: "EMS API",
    _postman_id: "ems-api-collection-id",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000/api" },
    { key: "token", value: "" },
  ],
  item: [] as any[],
};

const defaultHeaders = [
  { key: "Content-Type", value: "application/json" },
  { key: "Authorization", value: "Bearer {{token}}" },
];

const makeUrl = (basePath: string, withId = false): UrlObject => {
  const segments = [basePath];
  if (withId) segments.push(":id");
  return {
    raw: `{{baseUrl}}/${segments.join("/")}`,
    host: ["{{baseUrl}}"],
    path: segments,
  };
};

const makeListUrl = (basePath: string): UrlObject => ({
  ...makeUrl(basePath),
  query: [
    { key: "page", value: "1" },
    { key: "limit", value: "10" },
  ],
});

const makeCrudItemsForResource = (config: ResourceConfig) => {
  const { basePath, pluralLabel, singularLabel, sampleBody } = config;

  const items: any[] = [];

  const addItem = (
    name: string,
    method: HttpMethod,
    url: UrlObject,
    body?: any
  ) => {
    const req: any = {
      method,
      header: defaultHeaders,
      url,
    };
    if (body) {
      req.body = {
        mode: "raw",
        raw: JSON.stringify(body, null, 2),
      };
    }
    items.push({
      name,
      request: req,
    });
  };

  // Create
  addItem(
    `Create ${singularLabel}`,
    "POST",
    makeUrl(basePath),
    sampleBody.create
  );

  // List
  addItem(
    `List ${pluralLabel}`,
    "GET",
    makeListUrl(basePath)
  );

  // Get by ID
  addItem(
    `Get ${singularLabel} by ID`,
    "GET",
    makeUrl(basePath, true)
  );

  // Update
  addItem(
    `Update ${singularLabel}`,
    "PUT",
    makeUrl(basePath, true),
    sampleBody.update
  );

  // Delete
  addItem(
    `Delete ${singularLabel}`,
    "DELETE",
    makeUrl(basePath, true)
  );

  return items;
};

// ---------------- RESOURCE CONFIGS ----------------

const resources: ResourceConfig[] = [
  // Clients
  {
    folderName: "Clients",
    basePath: "clients",
    pluralLabel: "Clients",
    singularLabel: "Client",
    sampleBody: {
      create: {
        userId: "{{someUserObjectId}}",
        phone: "+1-555-123456",
        type: "new",
        isActive: true,
      },
      update: {
        phone: "+1-555-987654",
        type: "existing",
        isActive: false,
      },
    },
  },

  // Employees
  {
    folderName: "Employees",
    basePath: "employees",
    pluralLabel: "Employees",
    singularLabel: "Employee",
    sampleBody: {
      create: {
        userId: "{{someUserObjectId}}",
        type: "coder",
        skills: ["React", "Node"],
        isActive: true,
      },
      update: {
        type: "lead",
        skills: ["React", "Node", "Leadership"],
        isActive: true,
      },
    },
  },

  // Freelancers
  {
    folderName: "Freelancers",
    basePath: "freelancers",
    pluralLabel: "Freelancers",
    singularLabel: "Freelancer",
    sampleBody: {
      create: {
        userId: "{{someUserObjectId}}",
        employeeId: "{{someEmployeeObjectId}}",
        country: "India",
        timezone: "Asia/Kolkata",
        hourlyRate: 25,
        availabilityHoursPerWeek: 20,
        portfolioLink: "https://portfolio.example.com",
        freelanceProfile: "https://upwork.com/profile/123",
        experienceLevel: "intermediate",
        isActive: true,
        assignedProjects: ["{{someProjectObjectId}}"],
        rating: 4.5,
        paymentMethod: "PayPal",
        paymentEmail: "freelancer@example.com",
        currency: "USD",
      },
      update: {
        hourlyRate: 30,
        availabilityHoursPerWeek: 25,
        isActive: true,
        rating: 4.8,
      },
    },
  },

  // Projects
  {
    folderName: "Projects",
    basePath: "projects",
    pluralLabel: "Projects",
    singularLabel: "Project",
    sampleBody: {
      create: {
        clientId: "{{someClientObjectId}}",
        title: "Website Redesign",
        description: "Full redesign for ACME Corp website.",
        tags: ["web", "redesign", "priority"],
        projectType: "web",
        priority: "high",
        status: "in_progress",
        estimatedHours: 120,
        totalHoursTaken: 10,
        startDate: "2025-01-01T00:00:00.000Z",
        endDate: "2025-02-01T00:00:00.000Z",
        isAssigned: true,
        assignees: [],
        leadership: ["{{employeeLeadId}}"],
        leadAssignee: "{{employeeLeadId}}",
        VAInCharge: "{{employeeVAId}}",
        freelancers: ["{{employeeFreelancerId}}"],
        updateIncharge: "{{employeeUpdateInchargeId}}",
        githubLinks: ["https://github.com/org/repo"],
        loomLinks: ["https://www.loom.com/share/demo"],
        fileLinks: ["https://drive.google.com/somefile"],
        clientWhatsappGroupLink: "https://chat.whatsapp.com/client-group",
        teamWhatsappGroupLink: "https://chat.whatsapp.com/team-group",
        slackGroupLink: "https://slack.com/app_redirect?channel=project-x",
        clientUpsetOrDidntReply3Days: false,
        clientHandling: "Handled via weekly calls",
        remarks: "Important client",
      },
      update: {
        title: "Website Redesign (Phase 2)",
        status: "on_hold",
        priority: "medium",
        remarks: "Waiting for client feedback",
      },
    },
  },

  // Project Assignments
  {
    folderName: "Project Assignments",
    basePath: "project-assignments",
    pluralLabel: "Project Assignments",
    singularLabel: "Project Assignment",
    sampleBody: {
      create: {
        projectId: "{{someProjectObjectId}}",
        employeeId: "{{someEmployeeObjectId}}",
        role: "coder",
      },
      update: {
        role: "lead",
      },
    },
  },

  // Project Milestones
  {
    folderName: "Project Milestones",
    basePath: "project-milestones",
    pluralLabel: "Project Milestones",
    singularLabel: "Project Milestone",
    sampleBody: {
      create: {
        projectId: "{{someProjectObjectId}}",
        title: "Design Approved",
        dueDate: "2025-01-15T00:00:00.000Z",
        status: "not_started",
      },
      update: {
        status: "in_progress",
      },
    },
  },

  // Trainings
  {
    folderName: "Trainings",
    basePath: "trainings",
    pluralLabel: "Trainings",
    singularLabel: "Training",
    sampleBody: {
      create: {
        title: "React Advanced Workshop",
        description: "Deep dive into React patterns.",
        type: "technical",
        domain: "frontend",
        tags: ["react", "frontend"],
        startDate: "2025-01-05T00:00:00.000Z",
        endDate: "2025-01-10T00:00:00.000Z",
        status: "ongoing",
      },
      update: {
        status: "completed",
        remarks: "Well received by team",
      } as any, // remarks isn't actually in schema but harmless in Postman
    },
  },

  // Training Milestones
  {
    folderName: "Training Milestones",
    basePath: "training-milestones",
    pluralLabel: "Training Milestones",
    singularLabel: "Training Milestone",
    sampleBody: {
      create: {
        trainingId: "{{someTrainingObjectId}}",
        title: "Module 1 Completion",
        description: "Basic concepts covered",
        dueDate: "2025-01-06T00:00:00.000Z",
      },
      update: {
        title: "Module 1 & 2 Completion",
      },
    },
  },

  // Training Tasks
  {
    folderName: "Training Tasks",
    basePath: "training-tasks",
    pluralLabel: "Training Tasks",
    singularLabel: "Training Task",
    sampleBody: {
      create: {
        trainingId: "{{someTrainingObjectIdAsString}}",
        title: "Complete React Hooks exercise",
        description: "Implement custom hooks in project.",
        defaultTask: true,
        startDate: "2025-01-05T00:00:00.000Z",
        endDate: "2025-01-07T00:00:00.000Z",
        attachments: [],
        weight: 3,
      },
      update: {
        weight: 4,
        endDate: "2025-01-08T00:00:00.000Z",
      },
    },
  },

  // Training Task Assignments
  {
    folderName: "Training Task Assignments",
    basePath: "training-task-assignments",
    pluralLabel: "Training Task Assignments",
    singularLabel: "Training Task Assignment",
    sampleBody: {
      create: {
        trainingTaskId: "{{trainingTaskIdString}}",
        trainingId: "{{trainingIdString}}",
        employeeId: "{{employeeIdString}}",
        type: "default",
        assignedAt: "2025-01-05T09:00:00.000Z",
        startDate: "2025-01-05T09:00:00.000Z",
        endDate: "2025-01-08T09:00:00.000Z",
        score: 8,
      },
      update: {
        type: "personal",
        score: 9,
      },
    },
  },

  // Training Task Updates
  {
    folderName: "Training Task Updates",
    basePath: "training-task-updates",
    pluralLabel: "Training Task Updates",
    singularLabel: "Training Task Update",
    sampleBody: {
      create: {
        trainingTaskAssignmentId: "{{trainingTaskAssignmentIdString}}",
        trainingId: "{{trainingIdString}}",
        trainingTaskId: "{{trainingTaskIdString}}",
        employeeId: "{{employeeIdString}}",
        date: "2025-01-06T10:00:00.000Z",
        status: "in_progress",
        isApproved: false,
        approvedBy: "{{userIdString}}",
        notes: "Working on exercises.",
        attachments: [],
      },
      update: {
        status: "completed",
        isApproved: true,
        notes: "Finished task successfully.",
      },
    },
  },

  // Training Assignments
  {
    folderName: "Training Assignments",
    basePath: "training-assignments",
    pluralLabel: "Training Assignments",
    singularLabel: "Training Assignment",
    sampleBody: {
      create: {
        trainingId: "{{someTrainingObjectId}}",
        employeeId: "{{someEmployeeObjectId}}",
        status: "active",
      },
      update: {
        status: "completed",
      },
    },
  },

  // Employee Tasks
  {
    folderName: "Employee Tasks",
    basePath: "employee-tasks",
    pluralLabel: "Employee Tasks",
    singularLabel: "Employee Task",
    sampleBody: {
      create: {
        title: "Daily standup report",
        description: "Send daily status update.",
        defaultTask: true,
        startDate: "2025-01-01T09:00:00.000Z",
        endDate: "2025-01-01T09:15:00.000Z",
        attachments: [],
        weight: 1,
      },
      update: {
        description: "Send detailed daily status update.",
      },
    },
  },

  // Employee Task Assignments
  {
    folderName: "Employee Task Assignments",
    basePath: "employee-task-assignments",
    pluralLabel: "Employee Task Assignments",
    singularLabel: "Employee Task Assignment",
    sampleBody: {
      create: {
        employeeTaskId: "{{employeeTaskIdString}}",
        employeeId: "{{employeeIdString}}",
        type: "default",
        assignedAt: "2025-01-02T09:00:00.000Z",
        startDate: "2025-01-02T09:00:00.000Z",
        endDate: "2025-01-02T18:00:00.000Z",
        score: 10,
      },
      update: {
        type: "personal",
        score: 8,
      },
    },
  },

  // Employee Task Updates
  {
    folderName: "Employee Task Updates",
    basePath: "employee-task-updates",
    pluralLabel: "Employee Task Updates",
    singularLabel: "Employee Task Update",
    sampleBody: {
      create: {
        employeeTaskAssignmentId: "{{employeeTaskAssignmentIdString}}",
        employeeId: "{{employeeIdString}}",
        employeeTaskId: "{{employeeTaskIdString}}",
        date: "2025-01-02T12:00:00.000Z",
        status: "in_progress",
        isApproved: false,
        approvedBy: "{{managerUserIdString}}",
        notes: "Started working on task.",
        attachments: [],
      },
      update: {
        status: "completed",
        isApproved: true,
        notes: "Task done.",
      },
    },
  },
];

// ---------------- BUILD COLLECTION ----------------

for (const res of resources) {
  collection.item.push({
    name: res.folderName,
    item: makeCrudItemsForResource(res),
  });
}

const outPath = path.join(process.cwd(), "EMS_API_Collection.json");
fs.writeFileSync(outPath, JSON.stringify(collection, null, 2));
console.log("✅ Generated Postman collection at", outPath);
