"use client";
import { Application, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
const frameworks = [
  {
    value: "All Tags",
    label: "All Tags",
  },
  {
    value: "Software Development",
    label: "Software Development",
  },
  {
    value: "Systems",
    label: "Systems",
  },
  {
    value: "IOT",
    label: "IOT",
  },
  {
    value: "Machine Learning",
    label: "Machine Learning",
  },
  {
    value: "Artificial Intelligence",
    label: "Artifical Intelligence",
  },
  {
    value: "Miscellaneous",
    label: "Miscellaneous",
  },
];
function isOpen(project: Application) {
  let i = 0;
  while (i < project.tags.length) {
    if (project.status == "Open") {
      return true;
    }
    i++;
  }
  return false;
}
function filterData(
  setData: any,
  data: any,
  ogData: any,
  tag: any,
  onlyOpen: any
) {
  //console.log(data, ogData, tag);
  if (tag === "All Tags") {
    setData(ogData);
    return;
  }
  let i = 0;
  const newData = ogData.filter((pro: any) => {
    for (const t of pro.tags) {
      //console.log(t);
      if (t === tag && (!onlyOpen || pro.status === "Open")) return true;
    }
    return false;
  });

  // console.log(newData);
  setData(newData);
}
const allTags = [
  "Software Development",
  "Systems",
  "IOT",
  "Machine Learning",
  "Artifical Intelligence",
  "Misc",
];

async function getData(setData: any, projectId: any): Promise<Boolean> {
  // Fetch data from your API here.
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faculty/getprojectapplicants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectid: projectId,
    }),
    withCredentials: true,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setData(data);
    });

  return true;
}

export default function Comp({ projectId }: any) {
  const [data, setData] = useState([]);
  const [ogData, setOgData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [checked, setChecked] = useState("indeterminate");
  const [open, setOpen] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [value, setValue] = useState("All Tags");
  useEffect(() => {
    getData(setOgData, projectId);
  }, []);
  useEffect(() => {
    console.log("mai hi hu bhai bahar se");
    if (ogData.length > 0) {
      console.log("mai hi hu bhai andar se");
      filterData(setData, data, ogData, value, onlyOpen);
    }
  }, [ogData, value]);
  console.log(data);
  // console.log("hello");
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
