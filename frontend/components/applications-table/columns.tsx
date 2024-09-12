"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export type Application = {
  //   id: string;
  name: string;
  cgpa: number;
  status: string;
  id: string;
  resume: string;
  projectId: string;
  category: string;
  remarks: string;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "projectId",
    header: "",
    cell: ({ row }) => {
      return <></>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return <></>;
    },
  },
  // {
  //   accessorKey: "cgpa",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className=" -ml-6"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         CGPA
  //         <ArrowUpDown className="h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "remarks",
    header: "Statement of Motivation",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>View</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {row.getValue("remarks")}
          </DialogContent>
        </Dialog>
      );
    },
  },
  // {
  //   accessorKey: "resume",
  //   header: "",
  //   cell: ({ row }) => {
  //     return (
  //       <Button
  //         size="sm"
  //         onClick={() => {
  //           window.open(row.getValue("resume"), "_blank");
  //         }}
  //       >
  //         View Resume
  //       </Button>
  //     );
  //   },
  // },

  {
    accessorKey: "status",
    header: "Application Status",
    cell: ({ row }) => {
      console.log(row.getValue("projectId"));
      const projectId = row.getValue("projectId");
      const studentId = row.getValue("id");
      if (row.getValue("status") === "Accepted") {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate  flex flex-row gap-2 flex-wrap">
              <Badge className="text-md">Accepted</Badge>
            </span>
          </div>
        );
      } else if (row.getValue("status") === "Rejected") {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate  flex flex-row gap-2 flex-wrap">
              <Badge className="text-md" variant="destructive">
                Rejected
              </Badge>
            </span>
          </div>
        );
      } else {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate  flex flex-row gap-4 flex-wrap">
              <Button
                size="sm"
                onClick={async () => {
                  fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/acceptstudent`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        projectid: projectId,
                        studentid: studentId,
                      }),
                      withCredentials: true,
                    }
                  ).then((response) => {
                    if (response.status === 200) {
                      window.location.reload();
                    } else {
                      alert("Error in accepting student");
                    }
                  });
                }}
              >
                Accept
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/rejectstudent`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        projectid: projectId,
                        studentid: studentId,
                      }),
                      withCredentials: true,
                    }
                  ).then((response) => {
                    if (response.status === 200) {
                      window.location.reload();
                    } else {
                      alert("Error in rejecting student");
                    }
                  });
                }}
              >
                Reject
              </Button>
            </span>
          </div>
        );
      }
    },
  },
];
