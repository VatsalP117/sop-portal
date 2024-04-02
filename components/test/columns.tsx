"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string;
  project_name: string;
  professor: string;
  tags: string[];
  status: "Open" | "Closed" | "Completed";
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "project_name",
    header: "Project Name",
  },
  {
    accessorKey: "professor",
    header: "Professor",
  },
  {
    accessorKey: "tags",
    header: "Project Tags",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
