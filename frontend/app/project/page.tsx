"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { format, min } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
import withAuth from "@/app/withAuth";
import { useRouter } from "next/navigation";
import domains from "../../utils/domains";
import Back from "@/components/back";
const frameworks = domains.map((framework) => ({
  key: framework,
  value: framework,
}));
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
  date: z
    .date({
      required_error: "A date is required.",
    })
    .min(new Date(), "Date must be in the future"),
  minStudents: z.number().min(1, {
    message: "Minimum students must be at least 1",
  }),
  maxStudents: z.number().min(1, {
    message: "Maximum students must be at least 1",
  }),
});
const values: ISelectProps["values"][0][] = frameworks;
function ProfileForm(props) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [gpsrn, setgpsrn] = useState("");
  const [initial, setInitial] = useState(null);
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [description, setDescription] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredValues = values.filter((value) =>
    value.value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    if (projectId !== "new") {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/getprojectdescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectid: projectId,
          }),
          withCredentials: true,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          form.reset({
            project_title: data.project_title,
            status: data.status,
            date: new Date(data.date),
            gpsrn: props.user.id,
            minStudents: data.minStudents,
            maxStudents: data.maxStudents,
          });
          setSelectedItems(data.tags || []);
          setDescription(data.description);
          setInitial(data);
        });
    } else {
      form.reset({
        minStudents: 1,
        maxStudents: 1,
      });
    }
  }, []);
  useEffect(() => {
    setgpsrn(props.user.id);
  }, []);
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (projectId === "new") {
      try {
        const response: any = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/createproject`,
          {
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
              gpsrn: props.user.id,
            }),
          }
        );
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
        const response: any = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/editproject`,
          {
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
              gpsrn: props.user.id,
            }),
          }
        );
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
      <Back />
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
                  <FormLabel>Start Date</FormLabel>
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
              name="minStudents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Students</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Minimum Students"
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                      defaultValue={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxStudents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Students</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Maximum Students"
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                      defaultValue={1}
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
                  <span>Select Domains</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[50vw] max-h-96 overflow-y-auto m-12"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuSeparator />
                <div className="px-2 py-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search Domains..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <DropdownMenuSeparator />
                {filteredValues.map((value, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    onSelect={(e) => e.preventDefault()}
                    checked={isOptionSelected(value.key)}
                    onCheckedChange={() => handleSelectChange(value.key)}
                  >
                    {value.value}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-row gap-2 flex-wrap">
              {selectedItems.map((item) => (
                <Badge>{item}</Badge>
              ))}
            </div>
          </div>
          <h3>Project Description</h3>
          <Badge variant="outline">Faculty GPSRN : {gpsrn}</Badge>
          {(initial || projectId === "new") && (
            <Editor
              editable={true}
              setDescription={setDescription}
              // initial={initial?.description}
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
export default withAuth(ProfileForm, "faculty");
