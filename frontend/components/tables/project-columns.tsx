"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectResponse } from "@/types/project";

export const getProjectColumns = (role: string): ColumnDef<ProjectResponse>[] => {
  const columns: ColumnDef<ProjectResponse>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.original.status || "—"}</div>,
    },

    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <div className="capitalize">{row.original.priority || "—"}</div>,
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
                <div>
                  {c?.name || c?.companyName || c?.email || "—"}
                </div>
              );
            },
          },
        ]
      : []),

    {
      accessorKey: "assignees",
      header: "Assignees",
      cell: ({ row }) => {
        const list = row.original.assignees?.map((a) => a.name).join(", ");
        return <div>{list || "—"}</div>;
      },
    },

    {
      accessorKey: "startDate",
      header: "Start",
      cell: ({ row }) => {
        const date = row.original.startDate;
        return <div>{date ? new Date(date).toLocaleDateString() : "—"}</div>;
      },
    },

    {
      accessorKey: "endDate",
      header: "End",
      cell: ({ row }) => {
        const date = row.original.endDate;
        return <div>{date ? new Date(date).toLocaleDateString() : "—"}</div>;
      },
    },

    // -------------------------------
    // ✅ ACTIONS COLUMN
    // -------------------------------
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex gap-2">
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
