"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Application = {
  //   id: string;
  student_name: string;
  student_id: string;
  cgpa: number;
  status: string;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "student_id",
    header: "BITS Id",
  },
  {
    accessorKey: "cgpa",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=" -ml-6"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CGPA
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Application Status",
    cell: ({ row }) => {
      //console.log(row.getValue("tags"));
      if (row.getValue("status") === "Accepted") {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate  flex flex-row gap-2 flex-wrap">
              <Badge>Accepted</Badge>
            </span>
          </div>
        );
      } else if (row.getValue("status") === "Rejected") {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate  flex flex-row gap-2 flex-wrap">
              <Badge variant="destructive">Rejected</Badge>
            </span>
          </div>
        );
      } else {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate  flex flex-row gap-4 flex-wrap">
              <Button size="sm">Accept</Button>
              <Button size="sm">Reject</Button>
            </span>
          </div>
        );
      }
    },
  },
];
