// src/components/projects/projectTable.tsx
"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { ProjectResponse } from "@/types/project";
import { getProjectColumns } from "./project-columns";

type FilterState = {
  search?: string;
  status?: string;
  priority?: string;
  projectType?: string;
  clientId?: string;
  startDate?: string;
  endDate?: string;
};

type ApiResponse = {
  success: boolean;
  data: ProjectResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`; // or your Express base path, e.g. "http://localhost:4000/projects"

export default function ProjectTable({ role }: { role: string }) {
  const [projects, setProjects] = React.useState<ProjectResponse[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({});
  const [filters, setFilters] = React.useState<FilterState>({});
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const columns = React.useMemo(() => getProjectColumns(role), [role]);

  const table = useReactTable({
    data: projects,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true, // we send sorting to the backend
  });

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const buildQueryString = React.useCallback(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));

    if (filters.search) params.set("search", filters.search);
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.projectType) params.set("projectType", filters.projectType);
    if (filters.clientId) params.set("clientId", filters.clientId);
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);

    if (sorting[0]) {
      params.set("sortBy", sorting[0].id as string);
      params.set("sortOrder", sorting[0].desc ? "desc" : "asc");
    }

    return params.toString();
  }, [page, limit, filters, sorting]);

  const fetchProjects = React.useCallback(async () => {
    try {
      setLoading(true);
      const qs = buildQueryString();
      console.log("Full URL of fetching projects: ", `${API_URL}?${qs}`);
      const res = await fetch(`${API_URL}?${qs}`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const json: ApiResponse = await res.json();

      setProjects(json.data || []);
      setTotal(json.pagination?.total || 0);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [buildQueryString]);

  // Fetch whenever filters / sorting / page change (with small debounce)
  React.useEffect(() => {
    const id = setTimeout(() => {
      fetchProjects();
    }, 250);
    return () => clearTimeout(id);
  }, [fetchProjects]);

  const updateFilter = (key: keyof FilterState, value?: string) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setPage(1);
    setFilters({});
  };

  return (
    <div className="w-full space-y-4">
      {/* TOP BAR / FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <Input
          placeholder="Search by title..."
          value={filters.search || ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="max-w-xs"
        />

        {/* Status */}
        <Select
          value={filters.status}
          onValueChange={(v) => updateFilter("status", v)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">Not started</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="on_hold">On hold</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select
          value={filters.priority}
          onValueChange={(v) => updateFilter("priority", v)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        {/* Project Type */}
        <Select
          value={filters.projectType}
          onValueChange={(v) => updateFilter("projectType", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>

        {/* Start Date */}
        <Input
          type="date"
          value={filters.startDate ? filters.startDate.split("T")[0] : ""}
          onChange={(e) =>
            updateFilter(
              "startDate",
              e.target.value ? new Date(e.target.value).toISOString() : undefined
            )
          }
          className="w-40"
        />

        {/* End Date */}
        <Input
          type="date"
          value={filters.endDate ? filters.endDate.split("T")[0] : ""}
          onChange={(e) =>
            updateFilter(
              "endDate",
              e.target.value ? new Date(e.target.value).toISOString() : undefined
            )
          }
          className="w-40"
        />

        {/* Clear filters */}
        <Button
          variant="ghost"
          className="text-xs"
          onClick={clearFilters}
          disabled={!Object.keys(filters).length}
        >
          Clear filters
        </Button>

        {/* New Project */}
        <Button
          className="ml-auto"
          onClick={() => window.location.assign("/projects/new")}
        >
          + Add Project
        </Button>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Columns <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllLeafColumns()
              .filter((column) => column.id !== "actions")
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TABLE */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header &&
                        typeof header.column.columnDef.header === "function"
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading projects...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : String(cell.getValue() ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION (server-side) */}
      <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
        <div>
          Page {page} of {totalPages} · {total} projects
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPage((p) => (p < totalPages ? p + 1 : p))
            }
            disabled={page >= totalPages || loading}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
