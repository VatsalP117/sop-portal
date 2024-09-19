"use client";
import Comp from "@/components/applications-table/comp";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Back from "@/components/back";
export default function Applications() {
  const [projectData, setProjectData] = useState([]);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  return (
    <div className="container pt-8 flex flex-col items-center justify-center gap-5">
      <div className="w-full">
        <Back />
      </div>
      <h1 className="text-5xl font-bold">Applications</h1>
      <Comp projectId={projectId} />
    </div>
  );
}
