"use client";
import CardDemo from "@/components/student-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Comp from "@/components/test/comp";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import withAuth from "@/app/withAuth";

import { useState } from "react";
import { toast } from "sonner";

const Student = (props) => {
  const [cgpa, setCgpa] = useState(8.0);
  const [resume, setResume] = useState("");

  return (
    <div className="container flex h-[90vh] w-screen flex-row py-8 md:gap-4 lg:gap-6">
      <div className="student-data-section basis-1/4  flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Card className="student-card flex flex-row items-center justify-center">
            <Avatar className="ml-6">
              <AvatarImage src={props.user.image} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardHeader className="m-auto mr-4">
              <CardTitle>{props.user.name}</CardTitle>
              <CardDescription className="font-bold">
                {props.user.email}
              </CardDescription>
            </CardHeader>
          </Card>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Update Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cgpa" className="text-right">
                    CGPA
                  </Label>
                  <Input
                    id="cgpa"
                    value={cgpa}
                    className="col-span-3"
                    onChange={(e) => {
                      setCgpa(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Resume
                  </Label>
                  <Input
                    id="resume"
                    value={resume}
                    className="col-span-3"
                    onChange={(e) => {
                      setResume(e.target.value);
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={async () => {
                  const response = await fetch("/api/student/uploadstudentdetails", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    body: JSON.stringify({
                      cgpa: cgpa,
                      resume: resume,
                    }),
                  });
                  if (response.status === 200) {
                    toast("profile updated successfully")
                  } else {
                    toast("Profile update failed");
                  }
                }}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Card className="resume-card flex flex-row items-center justify-center">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <Icons.upload className="ml-auto mr-4 h-10 w-10" />
        </Card> */}
        <Card className="projects-applied-card flex flex-col">
          <CardHeader>
            <CardTitle>Projects Applied</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-start ">
              <CardDescription className="basis-1/2">
                Project Title
              </CardDescription>
              <Badge>Accepted</Badge>
            </div>
            <div className="flex flex-row items-center justify-start ">
              <CardDescription className="basis-1/2">
                Project Title
              </CardDescription>
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="flex flex-row items-center justify-start ">
              <CardDescription className="basis-1/2">
                Project Title
              </CardDescription>
              <Badge variant="destructive">Rejected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="projects-section basis-3/4 ">
        <Comp />
      </div>
    </div>
  );
};

export default withAuth(Student, "student");
