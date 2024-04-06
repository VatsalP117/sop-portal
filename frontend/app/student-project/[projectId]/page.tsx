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
import { toast } from "@/components/ui/use-toast";
import Editor from "@/components/editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
const statuses = [
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
  { label: "Completed", value: "Completed" },
] as const;
const projectDetails = {
  project_title: "Rollator ka Project",
  tags: "",
  status: "Open",
  date: new Date(),
  gpsrn: "CSF304",
};
const formSchema = z.object({
  project_title: z.string().min(5, {
    message: "Project Title must be at least 5 characters.",
  }),
  tags: z.string(),
  status: z.string({ required_error: "A status is required." }),
  date: z.date(),
  gpsrn: z.string(),
});
const formSchema2 = z.object({
  comments: z.string().min(10, {
    message: "Comments must be at least 10 characters.",
  }),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_title: "Project Title",
    },
    mode: "onChange",
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
  });
  return (
    <div className="container pt-12 flex flex-col">
      <h1 className="text-5xl font-bold mb-8">Project Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-row gap-20 items-center justify-between md:w-1/2">
            <FormField
              control={form.control}
              name="project_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={projectDetails.project_title} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} value={projectDetails.status} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-16 items-center w-1/2 justify-between">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input {...field} value={projectDetails.date} />
                  </FormControl>
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
                      value={projectDetails.gpsrn}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h3>Project Description</h3>
          <Editor
            editable={false}
            initial={[
              {
                type: "paragraph",
                content: "Project Description",
              },
            ]}
          />
        </form>
      </Form>
      <Form {...form2}>
        <form
          onSubmit={form2.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mt-6"
        >
          <FormField
            control={form2.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please mention relevant comments you would like the faculty to
                  consider.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
