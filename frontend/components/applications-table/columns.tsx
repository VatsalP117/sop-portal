"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Application = {
  //   id: string;
  name: string;
  cgpa: number;
  status: string;
  id: string;
  resume: string;
  projectId: string;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "projectId",
    header: "",
    cell: ({ row }) => {
      return (<></>)
    }
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return (<></>)
    }
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
    accessorKey: "resume",
    header:"",
    cell: ({ row }) => {
      return (
          <Button onClick={()=>{
            window.open(row.getValue("resume"), "_blank");
          }}>View Resume</Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Application Status",
    cell: ({ row }) => {
      console.log(row.getValue("projectId"));
      const projectId=row.getValue("projectId");
      const studentId=row.getValue("id");
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
              <Button size="sm" onClick={async ()=>{
                fetch(`/api/faculty/acceptstudent`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    projectid: projectId,
                    studentid: studentId
                  }),
                  withCredentials: true,
                }).then((response) => {
                  if(response.status===200){
                    window.location.reload();
                  } else {
                    alert("Error in accepting student");
                  }
                })
              }}>Accept</Button>
              <Button size="sm" onClick={()=>{
                fetch(`/api/faculty/rejectstudent`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    projectid: projectId,
                    studentid: studentId
                  }),
                  withCredentials: true,
                }).then((response) => {
                  if(response.status===200){
                    window.location.reload();
                  } else {
                    alert("Error in rejecting student");
                  }
                })
              }}>Reject</Button>
            </span>
          </div>
        );
      }
    },
  },
];
