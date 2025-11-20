// components/project-form.tsx
"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  projectSchema,
  ProjectFormValues,
  statusOptions,
  projectTypeOptions,
  priorityOptions,
  tagOptions,
} from "@/lib/validation/project-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import z from "zod";

type Option = {
  value: string;
  label: string;
};

type ProjectFormProps = {
  mode: "create" | "edit";
  initialData?: Partial<ProjectFormValues> & { id?: string };
};

export function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const router = useRouter();

  const [users, setUsers] = React.useState<Option[]>([]);
  const [clients, setClients] = React.useState<Option[]>([]);
  const [freelancers, setFreelancers] = React.useState<Option[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch options from your Node+Express backend
  React.useEffect(() => {
    async function loadOptions() {
      try {
        const [usersRes, clientsRes, freelancersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/freelancers`),
        ]);

        const usersData = await usersRes.json();
        const clientsData = await clientsRes.json();
        const freelancersData = await freelancersRes.json();

        setUsers(
          usersData.map((u: any) => ({
            value: u._id,
            label: u.name || u.email || "Unnamed user",
          }))
        );

        setClients(
          clientsData.map((c: any) => ({
            value: c._id,
            label: c.name || "Unnamed client",
          }))
        );

        setFreelancers(
          freelancersData.map((f: any) => ({
            value: f._id,
            label: f.name || "Unnamed freelancer",
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadOptions();
  }, []);

const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      status: initialData?.status ?? "active",
      description: initialData?.description ?? "",
      fileLinks: initialData?.fileLinks ?? [],
      githubLinks: initialData?.githubLinks ?? [],
      loomLinks: initialData?.loomLinks ?? [],
      clientId: (initialData?.clientId as any) ?? "",
      projectType: (initialData?.projectType as any) ?? undefined,
      priority: initialData?.priority ?? "medium",
      estimatedHoursRequired:
        (initialData?.estimatedHoursRequired as any) ?? undefined,
      totalHoursTaken: (initialData?.totalHoursTaken as any) ?? undefined,
      startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      isAssigned: initialData?.isAssigned ?? false,
      assignees: (initialData?.assignees as any) ?? [],
      leadAssignee: (initialData?.leadAssignee as any) ?? "",
      VAIncharge: (initialData?.VAIncharge as any) ?? "",
      freelancers: (initialData?.freelancers as any) ?? [],
      updateIncharge: (initialData?.updateIncharge as any) ?? "",
      codersRecommendation: (initialData?.codersRecommendation as any) ?? [],
      leadership: (initialData?.leadership as any) ?? "",
      clientWhatsappGroupLink: initialData?.clientWhatsappGroupLink ?? "",
      teamWhatsappGroupLink: initialData?.teamWhatsappGroupLink ?? "",
      slackGroupLink: initialData?.slackGroupLink ?? "",
      clientUpsetOrDidntReply3Days:
        initialData?.clientUpsetOrDidntReply3Days ?? false,
      clientHandling: (initialData?.clientHandling as any) ?? "",
      selectedBy: (initialData?.selectedBy as any) ?? "",
      askUpdate: initialData?.askUpdate ?? "",
      tags: (initialData?.tags as any) ?? [],
      remarks: initialData?.remarks ?? "",
      milestones:
        initialData?.milestones?.map((m: any) => ({
          title: m.title ?? "",
          description: m.description ?? "",
          dueDate: m?.dueDate ? new Date(m.dueDate) : undefined,
          isCompleted: m.isCompleted ?? false,
          completedAt: m?.completedAt ? new Date(m.completedAt) : undefined,
          assignedTo: m.assignedTo ?? "",
        })) ?? [],
    },
  });

  const {
  fields: milestoneFields,
  append: appendMilestone,
  remove: removeMilestone,
} = useFieldArray<z.infer<typeof projectSchema>, "milestones">({
  control: form.control,
  name: "milestones",
});

const {
    fields: fileLinkFields,
    append: appendFileLink,
    remove: removeFileLink
} = useFieldArray<ProjectFormValues>({
  control: form.control,
  name: "fileLinks",
});

const {
  fields: githubLinkFields,
  append: appendGithubLink,
  remove: removeGithubLink,
} = useFieldArray<z.infer<typeof projectSchema>, "githubLinks">({
  control: form.control,
  name: "githubLinks",
});

const {
  fields: loomLinkFields,
  append: appendLoomLink,
  remove: removeLoomLink,
} = useFieldArray<z.infer<typeof projectSchema>, "loomLinks">({
  control: form.control,
  name: "loomLinks",
});


  async function onSubmit(values: ProjectFormValues) {
    try {
      setIsSubmitting(true);
      setError(null);

      // Convert string dates to Date for backend if needed
      const payload = {
        ...values,
        startDate: values.startDate || undefined,
        endDate: values.endDate || undefined,
        milestones:
          values.milestones?.map((m) => ({
            ...m,
            dueDate: m.dueDate || undefined,
            completedAt: m.completedAt || undefined,
          })) ?? [],
      };

      const url =
        mode === "create"
          ? `${process.env.NEXT_PUBLIC_API_URL}/projects`
          : `${process.env.NEXT_PUBLIC_API_URL}/projects/${initialData?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Something went wrong");
      }

      router.push("/projects");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEdit = mode === "edit";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-5xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {isEdit ? "Edit Project" : "Create Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Describe the project..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type, Priority, Client */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectTypeOptions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Hours & Dates */}
            <div className="grid md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="estimatedHoursRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        placeholder="e.g. 40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalHoursTaken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Hours Taken</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        placeholder="e.g. 32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ? field.value.toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ? field.value.toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Assignment & Roles */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isAssigned"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(val) =>
                            field.onChange(Boolean(val))
                          }
                        />
                      </FormControl>
                      <FormLabel className="mt-0">
                        Is Assigned
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leadAssignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Assignee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="VAIncharge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VA Incharge</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="updateIncharge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Update Incharge</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="leadership"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leadership</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientHandling"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Handling</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="selectedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selected By</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Multi-selects: assignees, freelancers, codersRecommendation */}
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="assignees"
                render={() => (
                  <FormItem>
                    <FormLabel>Assignees</FormLabel>
                    <div className="border rounded-md p-2 h-40 overflow-y-auto space-y-1">
                      {users.map((u) => (
                        <FormField
                          key={u.value}
                          control={form.control}
                          name="assignees"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(u.value);
                            return (
                              <FormItem
                                key={u.value}
                                className="flex items-center space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          u.value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (v) => v !== u.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {u.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="freelancers"
                render={() => (
                  <FormItem>
                    <FormLabel>Freelancers</FormLabel>
                    <div className="border rounded-md p-2 h-40 overflow-y-auto space-y-1">
                      {freelancers.map((f) => (
                        <FormField
                          key={f.value}
                          control={form.control}
                          name="freelancers"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(f.value);
                            return (
                              <FormItem
                                key={f.value}
                                className="flex items-center space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          f.value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (v) => v !== f.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {f.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codersRecommendation"
                render={() => (
                  <FormItem>
                    <FormLabel>Coders Recommendation</FormLabel>
                    <div className="border rounded-md p-2 h-40 overflow-y-auto space-y-1">
                      {users.map((u) => (
                        <FormField
                          key={u.value}
                          control={form.control}
                          name="codersRecommendation"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(u.value);
                            return (
                              <FormItem
                                key={u.value}
                                className="flex items-center space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          u.value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (v) => v !== u.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {u.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Communication Links */}
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="clientWhatsappGroupLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client WhatsApp Group Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamWhatsappGroupLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team WhatsApp Group Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slackGroupLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slack Group Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Client flag */}
            <FormField
              control={form.control}
              name="clientUpsetOrDidntReply3Days"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(Boolean(val))}
                    />
                  </FormControl>
                  <FormLabel className="mt-0">
                    Client upset or didn&apos;t reply for 3 days
                  </FormLabel>
                </FormItem>
              )}
            />

            {/* Links arrays */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <FormLabel>File Links</FormLabel>
                {fileLinkFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`fileLinks.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            value={field.value?.url ?? ""}
                            onChange={(e) => field.onChange({ url: e.target.value })}
                            />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeFileLink(index)}
                        >
                          Remove
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendFileLink({url: ""})}
                >
                  Add File Link
                </Button>
              </div>

              <div className="space-y-2">
                <FormLabel>GitHub Links</FormLabel>
                {githubLinkFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`githubLinks.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            value={field.value?.url ?? ""}
                            onChange={(e) => field.onChange({ url: e.target.value })}
                            />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeGithubLink(index)}
                        >
                          Remove
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendGithubLink({url: ""})}
                >
                  Add GitHub Link
                </Button>
              </div>

              <div className="space-y-2">
                <FormLabel>Loom Links</FormLabel>
                {loomLinkFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`loomLinks.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            value={field.value?.url ?? ""}
                            onChange={(e) => field.onChange({ url: e.target.value })}
                            />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeLoomLink(index)}
                        >
                          Remove
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendLoomLink({url: ""})}
                >
                  Add Loom Link
                </Button>
              </div>
            </div>

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <FormField
                        key={tag}
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          const isChecked = field.value?.includes(tag);
                          return (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...(field.value || []),
                                        tag,
                                      ]);
                                    } else {
                                      field.onChange(
                                        (field.value || []).filter(
                                          (v) => v !== tag
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {tag}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ask Update & Remarks */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="askUpdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ask Update</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Milestones */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Milestones</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    appendMilestone({
                      title: "",
                      description: "",
                      dueDate: undefined,
                      isCompleted: false,
                      completedAt: undefined,
                      assignedTo: "",
                    })
                  }
                >
                  Add Milestone
                </Button>
              </div>

              <div className="space-y-3">
                {milestoneFields.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No milestones added yet.
                  </p>
                )}
                {milestoneFields.map((field, index) => (
                  <Card key={field.id} className="border-dashed">
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          Milestone {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMilestone(index)}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name={`milestones.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Milestone title"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`milestones.${index}.assignedTo`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assigned To</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || undefined}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select user" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {users.map((u) => (
                                    <SelectItem
                                      key={u.value}
                                      value={u.value}
                                    >
                                      {u.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`milestones.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={2}
                                placeholder="Milestone description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-3 gap-3">
                        <FormField
                          control={form.control}
                          name={`milestones.${index}.dueDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input
  type="date"
  {...field}
  value={field.value ? field.value.toISOString().split("T")[0] : ""}
  onChange={(e) => field.onChange(new Date(e.target.value))}
/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`milestones.${index}.isCompleted`}
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0 mt-6">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(val) =>
                                    field.onChange(Boolean(val))
                                  }
                                />
                              </FormControl>
                              <FormLabel className="mt-0">
                                Completed
                              </FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`milestones.${index}.completedAt`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Completed At</FormLabel>
                              <FormControl>
                                <Input
                                    type="date"
                                    {...field}
                                    value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                    />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                  ? "Update Project"
                  : "Create Project"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}