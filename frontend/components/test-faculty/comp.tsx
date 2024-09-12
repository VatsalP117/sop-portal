"use client";
import { Project, columns } from "./columns";
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
function isOpen(project: Project) {
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

async function getData(setData: any): Promise<Boolean> {
  // Fetch data from your API here.
  // setData([
  //   {
  //     id: "728ed52f",
  //     project_name: "Rollator wala project",
  //     professor: "Shubhangi DBMS wali",
  //     tags: "Machine Learning, Software Development".split(", "),
  //     status: "Open",
  //   },
  //   {
  //     id: "729ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Open",
  //   },
  //   {
  //     id: "730ed52f",
  //     project_name: "HEL ka SOP lmao",
  //     professor: "Shalini",
  //     tags: "Listening, Speaking, B- lagega".split(", "),
  //     status: "Open",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence, Software Development".split(
  //       ", "
  //     ),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },
  //   {
  //     id: "731ed52f",
  //     project_name: "Image processing",
  //     professor: "RPJ",
  //     tags: "Machine Learning, Artificial Intelligence".split(", "),
  //     status: "Closed",
  //   },

  //   // ...
  // ]);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/getprojects`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    setData(data);
  } else {
    console.log("Failed to fetch data");
    return false;
  }

  return true;
}

export default function Comp2() {
  const [data, setData] = useState([]);
  const [ogData, setOgData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [checked, setChecked] = useState("indeterminate");
  const [open, setOpen] = useState(false);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [value, setValue] = useState("All Tags");
  useEffect(() => {
    getData(setOgData);
  }, []);
  // useEffect(() => {
  //   if (ogData.length > 0) setData(ogData);

  //   console.log("mai hi hu bhai");
  // }, [ogData, value]);
  useEffect(() => {
    console.log("mai hi hu bhai bahar se");
    if (ogData.length > 0) {
      console.log("mai hi hu bhai andar se");
      filterData(setData, data, ogData, value, onlyOpen);
    }
  }, [ogData, value]);
  //console.log(data);
  console.log("hello");
  return (
    <div className="container mx-auto">
      <div className="flex flex-row gap-4 md:gap-8">
        <Button
          onClick={() => {
            setOnlyOpen(true);
            const newData = data.filter(isOpen);
            setData(newData);
          }}
        >
          Open Projects Only
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Filter by tag..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search tag..." />
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandList>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          variant="secondary"
          onClick={() => {
            setOnlyOpen(false);
            setData(ogData);
            setValue("All Tags");
          }}
        >
          Reset Filters
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
