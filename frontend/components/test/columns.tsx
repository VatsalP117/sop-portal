"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "../ui/badge";
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link className="max-w-[500px] truncate font-medium" href="/login">
            {row.getValue("project_name")}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "professor",
    // header: "Professor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Professor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell:({row})=>{
    //   return(
    //     <div className="flex space-x-2">
    //       <span className="max-w-[500px] truncate font-medium">
    //         {row.getValue("professor")}
    //       </span>
    //     </div>
    //   )

    // }
  },
  {
    accessorKey: "tags",
    header: "Project Tags",
    cell: ({ row }) => {
      //console.log(row.getValue("tags"));
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate  flex flex-row gap-2 flex-wrap">
            {row.getValue("tags").map((tag: any) => (
              <Badge variant="secondary">{tag}</Badge>
            ))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
