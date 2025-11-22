// scripts/generate-postman-collection.ts
import fs from "fs";
import path from "path";

interface UrlObject {
  raw: string;
  host: string[];
  path: string[];
  query?: { key: string; value: string }[];
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
  item: [],
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

const makeCrudItems = (resourceName: string, basePath: string) => {
  const singular = resourceName.replace(/s$/, "");
  return [
    {
      name: `Create ${singular}`,
      request: {
        method: "POST",
        header: defaultHeaders,
        url: makeUrl(basePath),
        body: { mode: "raw", raw: JSON.stringify({ _example: true }, null, 2) },
      },
    },
    {
      name: `List ${resourceName}`,
      request: {
        method: "GET",
        header: defaultHeaders,
        url: makeListUrl(basePath),
      },
    },
    {
      name: `Get ${singular} by ID`,
      request: {
        method: "GET",
        header: defaultHeaders,
        url: makeUrl(basePath, true),
      },
    },
    {
      name: `Update ${singular}`,
      request: {
        method: "PUT",
        header: defaultHeaders,
        url: makeUrl(basePath, true),
        body: { mode: "raw", raw: JSON.stringify({ _exampleUpdate: true }, null, 2) },
      },
    },
    {
      name: `Delete ${singular}`,
      request: {
        method: "DELETE",
        header: defaultHeaders,
        url: makeUrl(basePath, true),
      },
    },
  ];
};

// Register all folders
const resources = [
  { folder: "Clients", path: "clients" },
  { folder: "Employees", path: "employees" },
  { folder: "Freelancers", path: "freelancers" },
  { folder: "Projects", path: "projects" },
  { folder: "Project Assignments", path: "project-assignments" },
  { folder: "Project Milestones", path: "project-milestones" },
  { folder: "Trainings", path: "trainings" },
  { folder: "Training Milestones", path: "training-milestones" },
  { folder: "Training Tasks", path: "training-tasks" },
  { folder: "Training Task Assignments", path: "training-task-assignments" },
  { folder: "Training Task Updates", path: "training-task-updates" },
  { folder: "Training Assignments", path: "training-assignments" },
  { folder: "Employee Tasks", path: "employee-tasks" },
  { folder: "Employee Task Assignments", path: "employee-task-assignments" },
  { folder: "Employee Task Updates", path: "employee-task-updates" },
];

resources.forEach(r =>
  collection.item.push({
    name: r.folder,
    item: makeCrudItems(r.folder, r.path),
  })
);

const filePath = path.join(process.cwd(), "EMS_API_Collection.json");
fs.writeFileSync(filePath, JSON.stringify(collection, null, 2));
console.log("📌 Postman collection generated:", filePath);
