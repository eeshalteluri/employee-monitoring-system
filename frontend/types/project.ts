export interface UserRef {
  _id: string;
  name?: string;
  email?: string;
  companyName?: string;
}

export interface Milestone {
  title: string;
  description?: string;
  dueDate?: string;        // Date returned as ISO string
  isCompleted?: boolean;
  completedAt?: string;
  assignedTo?: UserRef | null;
}

export interface ProjectResponse {
  _id: string;

  title: string;
  description?: string;

  // POPULATED CLIENT
  clientId?: UserRef | null;

  // POPULATED ASSIGNEES
  assignees?: UserRef[];

  // POPULATED SINGLE USER RELATIONS
  leadAssignee?: UserRef | null;
  VAIncharge?: UserRef | null;
  updateIncharge?: UserRef | null;
  codersRecommendation?: UserRef | null;
  leadership?: UserRef | null;
  clientHandling?: UserRef | null;
  selectedBy?: UserRef | null;

  // POPULATED FREELANCERS
  freelancers?: UserRef[];

  // ENUM FIELDS
  projectType?: "client" | "research" | "management" | "training";
  priority?: "low" | "medium" | "high";
  status?:
    | "completed"
    | "cancelled"
    | "client"
    | "meeting done"
    | "contact made"
    | "active"
    | "recontacted"
    | "stalled"
    | "requirements sent"
    | "waiting for requirement"
    | "awaiting testimonial"
    | "training";

  // NUMERIC FIELDS
  estimatedHoursRequired?: number;
  totalHoursTaken?: number;

  // DATES (ISO string)
  startDate?: string;
  endDate?: string;

  // FLAGS
  isAssigned?: boolean;
  clientUpsetOrDidntReply3Days?: boolean;

  // LINKS
  githubLinks?: string[];
  loomLinks?: string[];
  fileLinks?: string[];

  clientWhatsappGroupLink?: string;
  teamWhatsappGroupLink?: string;
  slackGroupLink?: string;

  // TEXT FIELDS
  askUpdate?: string;
  tags?: ("stock")[];
  remarks?: string;

  // POPULATED MILESTONES
  milestones?: Milestone[];
}