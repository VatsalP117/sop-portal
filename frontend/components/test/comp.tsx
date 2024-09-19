"use client";
import { Project, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import domains from "../../utils/domains";
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
const frameworks = domains.map((framework) => ({
  value: framework,
  label: framework,
}));
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
  if (tag === "All Tags") {
    setData(ogData);
    return;
  }
  let i = 0;
  const newData = ogData.filter((pro: any) => {
    for (const t of pro.tags) {
      if (t === tag && (!onlyOpen || pro.status === "Open")) return true;
    }
    return false;
  });
  setData(newData);
}
async function getData(setData: any): Promise<Boolean> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/getallprojects`,
    {
      method: "GET",
      withCredentials: true,
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    setData(data);
  } else {
    console.log("Error in fetching data");
  }

  return true;
}

export default function Comp() {
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
          Show Open Projects
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              Filter by Domains
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[80vw] p-8">
            <Command>
              <CommandInput placeholder="Search Domains" />
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
