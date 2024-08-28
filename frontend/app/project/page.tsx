"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import MultiSelect from "@/components/multi-select";
import Editor from "@/components/editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
const statuses = [
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
  { label: "Completed", value: "Completed" },
] as const;
interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
}
const formSchema = z.object({
  project_title: z.string().min(5, {
    message: "Project Title must be at least 5 characters.",
  }),
  // tags: z.array(z.string()),
  status: z.string({ required_error: "A status is required." }),
  date: z.date({
    required_error: "A date is required.",
  }),
  gpsrn: z.string(),
});

export default function ProfileForm() {
  //const { toast } = useToast();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [initial, setInitial] = useState(null);
  useEffect(() => {
    if (projectId !== "new") {
      fetch("/api/faculty/getprojectdescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectid: projectId,
        }),
        withCredentials: true,
      })
        .then((res) => res.json())
        .then((data) => {
          //document.getElementById("project_title").value = data.project_title;
          setSelectedItems(data.tags);
          setInitial(data);
        });
    }
  }, []);

  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [description, setDescription] = useState([]);
  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };
  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false;
  };
  const values: ISelectProps["values"][0][] = [
    { key: "Software Development", value: "Software Development" },
    { key: "Machine Learning", value: "Machine Learning" },
    { key: "Systems", value: "Systems" },
    { key: "IOT", value: "IOT" },
    { key: "Artificial Intelligence", value: "Artificial Intelligence" },
    { key: "Miscellaneous", value: "Miscellaneous" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   project_title: "",
    // },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (projectId === "new") {
      try {
        console.log(values);
        console.log(selectedItems);
        console.log(description);
        const response: any = await fetch("/api/faculty/createproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          witthCredentials: true,
          body: JSON.stringify({
            ...values,
            date: values.date.toDateString(),
            tags: selectedItems,
            description: description,
          }),
        });
        if (response.status === 200) {
          toast("Project added successfully");
          router.push("/faculty");
        } else {
          toast("Failed to add project");
        }
      } catch (err) {
        console.log(err);
        toast("unable to connect to server");
      }
    } else {
      try {
        console.log(values);
        console.log(selectedItems);
        console.log(description);
        const response: any = await fetch("/api/faculty/editproject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          witthCredentials: true,
          body: JSON.stringify({
            ...values,
            date: values.date.toDateString(),
            tags: selectedItems,
            description: description,
            projectid: projectId,
          }),
        });
        if (response.status === 200) {
          toast("Project Updated Successfully");
          router.push("/faculty");
        } else {
          toast("Failed to update project");
        }
      } catch (err) {
        console.log(err);
        toast("unable to connect to server");
      }
    }
  }
  return (
    <div className="container pt-12 flex flex-col">
      <h1 className="text-5xl font-bold mb-8">Project Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-row gap-20 items-center">
            <FormField
              control={form.control}
              name="project_title"
              render={({ field }) => (
                <FormItem id="project_title">
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={initial?.project_title} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col h-full mt-2 ml-3 ">
                  <FormLabel>Status</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? statuses.find(
                                (stat) => stat.value === field.value
                              )?.label
                            : "Select status"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search status..." />
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandList>
                          {statuses.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("status", language.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-16 items-center">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gpsrn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPSRN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="GPSRN"
                      {...field}
                      defaultValue={initial?.gpsrn}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 font-bold">
                  <span>Select Tags</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuLabel>Tags</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {values.map(
                  (value: ISelectProps["values"][0], index: number) => {
                    return (
                      <DropdownMenuCheckboxItem
                        onSelect={(e) => e.preventDefault()}
                        key={index}
                        checked={isOptionSelected(value.key)}
                        onCheckedChange={() => handleSelectChange(value.key)}
                      >
                        {value.value}
                      </DropdownMenuCheckboxItem>
                    );
                  }
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-row gap-2">
              {selectedItems.map((item) => (
                <Badge>{item}</Badge>
              ))}
            </div>
          </div>
          <h3>Project Description</h3>
          {(initial || projectId === "new") && (
            <Editor
              editable={true}
              setDescription={setDescription}
              initial={initial?.description}
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
