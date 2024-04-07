"use client";
import Comp from "@/components/applications-table/comp";
import { useEffect, useState } from "react";
const projectData = [
  {
    student_name: "Vatsal Patel",
    cgpa: 8.33,
    status: "Accepted",
  },
  {
    student_name: "Vatsal Patel",
    cgpa: 8.33,
    status: "Accepted",
  },
  {
    student_name: "Ruchik Bakhai",
    cgpa: 9.12,
    status: "Accepted",
  },
  {
    student_name: "Sharad Arora",
    cgpa: 7.27,
    status: "Rejected",
  },
];
export default function Applications({params}) {
  const [projectData,setProjectData]=useState([]);
  // useEffect(() => {
    // const response = fetch("/api/applications/getapplications", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     projectid: params.projectId,
    //   }),
    //   withCredentials: true,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setProjectData(data);
    //   });
  // }, []);
  return (
    <div className="container pt-8 flex flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold">Applications</h1>
      <Comp projectId={params.projectId} />
    </div>
  );
}
