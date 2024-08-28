"use client";
import { useSearchParams } from "next/navigation";
export default function Demo() {
     const searchParams = useSearchParams();
     const projectId = searchParams.get("projectId");
     console.log(projectId);
  return (
    <div className="container pt-8 flex flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold">Demo</h1>
    </div>
  );
}
