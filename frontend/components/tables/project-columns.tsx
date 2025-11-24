// src/components/projects/projects-columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectResponse } from "@/types/project";

const statusLabel: Record<string, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  on_hold: "On hold",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  not_started: "outline",
  in_progress: "default",
  on_hold: "secondary",
  completed: "secondary",
  cancelled: "destructive",
};

const priorityVariant: Record<string, "outline" | "default" | "destructive" | "secondary"> = {
  low: "outline",
  medium: "secondary",
  high: "default",
  critical: "destructive",
};

export const getProjectColumns = (role: string): ColumnDef<ProjectResponse>[] => {
  const columns: ColumnDef<ProjectResponse>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium line-clamp-1">
          {row.original.title}
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status || "not_started";
        return (
          <Badge variant={statusVariant[status] ?? "outline"} className="capitalize">
            {statusLabel[status] ?? status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.original.priority || "medium";
        return (
          <Badge variant={priorityVariant[priority] ?? "outline"} className="capitalize">
            {priority}
          </Badge>
        );
      },
    },

    // SHOW CLIENT COLUMN ONLY FOR ADMIN & CLIENT
    ...(role === "admin" || role === "client"
      ? [
          {
            accessorKey: "clientId",
            header: "Client",
            cell: ({ row }: { row: any }) => {
              const c = row.original.clientId;
              return (
                <div className="text-sm text-muted-foreground">
                  {c?.name || c?.companyName || c?.email || "—"}
                </div>
              );
            },
          } as ColumnDef<ProjectResponse>,
        ]
      : []),

    {
      accessorKey: "assignees",
      header: "Assignees",
      cell: ({ row }) => {
        // depends on your ProjectResponse shape
        const list =
          row.original.assignees &&
          Array.isArray(row.original.assignees)
            ? (row.original.assignees as any[])
                .map((a) => a?.name || a)
                .filter(Boolean)
                .join(", ")
            : "";

        return (
          <div className="text-sm text-muted-foreground">
            {list || "—"}
          </div>
        );
      },
    },

    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.original.startDate;
        return (
          <div className="text-xs text-muted-foreground">
            {date ? new Date(date).toLocaleDateString() : "—"}
          </div>
        );
      },
    },

    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.original.endDate;
        return (
          <div className="text-xs text-muted-foreground">
            {date ? new Date(date).toLocaleDateString() : "—"}
          </div>
        );
      },
    },

    // ACTIONS
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.assign(`/projects/${project._id}`)}
            >
              View
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.location.assign(`/projects/${project._id}/edit`)
              }
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
};
